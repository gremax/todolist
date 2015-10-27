class Attachment < ActiveRecord::Base
  belongs_to :comment

  validates :filename, :comment, presence: true
end
