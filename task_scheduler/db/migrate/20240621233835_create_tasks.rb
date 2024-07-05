class CreateTasks < ActiveRecord::Migration[7.0]
  def change
    create_table :tasks do |t|
      t.string :name
      t.json :params
      t.integer :execution_time
      t.boolean :recurring
      t.string :cron_expression
      t.integer :status

      t.timestamps
    end
    add_index :tasks, :execution_time
    add_index :tasks, :recurring
  end
end
