class Task < ActiveRecord::Base
  validates :title, presence: true

  belongs_to :project
end
