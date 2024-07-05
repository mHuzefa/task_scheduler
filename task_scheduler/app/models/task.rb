class Task < ApplicationRecord
  # Associations
  has_many :schedulers, dependent: :destroy

  # Validations
  validates :name, presence: true
  validates :execution_time, presence: true
  validates :cron_expression, presence: true, if: :recurring?

  # Enums
  enum status: { pending: 0, in_progress: 1, failed: 2, completed: 3 }

  # Callbacks
  after_update :process_status_change, if: :saved_change_to_status?

  private

  # Example of handling status changes
  def process_status_change
    case status.to_sym
    when :completed
      # Perform actions when task status changes to completed
      # Example: Notify users or perform post-completion tasks
      puts "Task #{id} has been completed!"
    when :failed
      # Handle failed task status change
      # Example: Log error or notify administrators
      puts "Task #{id} has failed!"
    end
  end
end
