class CreateSchedulers < ActiveRecord::Migration[7.0]
  def change
    create_table :schedulers do |t|
      t.integer :task_id
      t.integer :execution_time

      t.timestamps
    end
    add_index :schedulers, :task_id
    add_index :schedulers, :execution_time
  end
end
