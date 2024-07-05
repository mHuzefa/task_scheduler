# lib/tasks/kafka.rake
namespace :kafka do
  desc "Start the Kafka task consumer"
  task consume: :environment do
    require_relative '../kafka/task_consumer'
    TaskConsumer.new.run
  end
end
