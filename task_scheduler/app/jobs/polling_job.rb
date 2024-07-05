class PollingJob < ApplicationJob
  queue_as :default

  def perform
    execution_window = Time.now.to_i...(Time.now.to_i + 1.minute.to_i)

    begin
      ActiveRecord::Base.transaction do
        tasks_to_execute = fetch_tasks_to_execute(execution_window)

        update_tasks_executing(tasks_to_execute)

        schedule_tasks(tasks_to_execute)

        update_tasks_scheduled(tasks_to_execute)

        publish_task_messages(tasks_to_execute)
      end
    rescue StandardError => e
      handle_error(e)
    end
  end

  private

  def fetch_tasks_to_execute(execution_window)
    Task.where(execution_time: execution_window)
        .select(:id, :execution_time, :status, :recurring, :cron_expression)
        .to_a
  end

  def update_tasks_executing(tasks)
    task_ids = tasks.map(&:id)
    Task.where(id: task_ids).update_all(status: 'pending')
  end

  def schedule_tasks(tasks)
    scheduled_tasks_data = tasks.map { |task| { task_id: task.id, execution_time: task.execution_time } }
    Scheduler.insert_all(scheduled_tasks_data) unless scheduled_tasks_data.empty?
  end

  def update_tasks_scheduled(tasks)
    task_ids = tasks.map(&:id)
    Task.where(id: task_ids).update_all(status: 'in_progress')
  end

  def publish_task_messages(tasks)
    tasks.each { |task| publish_message(task) }
  end

  def publish_message(task)
    Karafka.producer.produce_sync(topic: 'task', payload: task.to_json)
  rescue StandardError => e
    Rails.logger.error "Error publishing message for task #{task.id}: #{e.message}"
  end

  def handle_error(error)
    Rails.logger.error "Error in PollingJob: #{error.message}"
  end
end
