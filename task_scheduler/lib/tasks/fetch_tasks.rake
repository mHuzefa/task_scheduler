namespace :fetch_tasks do
  desc "Fetch tasks and put them in Redis"
  task fetch: :environment do
    redis = Redis.new
    current_time = Time.now.to_i
    next_minute = current_time + 60

    tasks = Scheduler.where(timestamp: current_time..next_minute)
    tasks.each do |scheduler|
      task = Task.find(scheduler.task_id)
      redis.zadd("tasks_scheduler", task.timestamp, task.id)
      $kafka_producer.produce(task.to_json, topic: "task_topic")
    end
    $kafka_producer.deliver_messages
  end
end
