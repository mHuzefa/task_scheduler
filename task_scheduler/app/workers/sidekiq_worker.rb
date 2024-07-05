class SidekiqWorker
  include Sidekiq::Worker

  def perform
    PollingJob.new.perform_now
  end
end
