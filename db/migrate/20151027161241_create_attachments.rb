class CreateAttachments < ActiveRecord::Migration
  def change
    create_table :attachments do |t|
      t.timestamps null: false
      t.string :file
      t.references :comment, index: true, foreign_key: true
    end
  end
end
