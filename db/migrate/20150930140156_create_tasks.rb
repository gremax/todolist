class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.timestamps null: false
      t.string :title
      t.boolean :complete, default: false
      t.integer :priority
      t.date :due_date
      t.references :project, index: true, foreign_key: true
    end
  end
end
