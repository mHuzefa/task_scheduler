require 'fugit'

class TaskConsumer < ApplicationConsumer
  def consume
    messages.each do |message|
      p message.payload
      task_params = message.payload
      task = Task.find(task_params['id'])

      ActiveRecord::Base.transaction do
        # Mark schedule as completed
        task.status = 'completed'
        if task.recurring?
          next_exec_time = next_execution_time(task.cron_expression)
          task.execution_time = next_exec_time
        end

        task.save!
        process_task(task)
      rescue StandardError => e
        # Handle errors
        puts "Error processing task #{task.id}: #{e.message}"
        task.update!(status: 'failed')
        raise ActiveRecord::Rollback # Rollback the transaction
      end
    end
  end

  private

  def next_execution_time(cron_expression)
    cron = Fugit::Cron.parse(cron_expression)
    cron.next_time.to_i
  end

  def process_task(task)
    # Implement task processing logic here
    puts "Processing task: #{task.inspect}"
  end
end
