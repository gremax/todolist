class Comment < ActiveRecord::Base
  belongs_to :task

  validates :task, :body, presence: true
end
