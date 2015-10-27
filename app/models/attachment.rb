class Attachment < ActiveRecord::Base
  mount_uploader :file, FileUploader

  belongs_to :comment

  validates :file, :comment, presence: true
end
