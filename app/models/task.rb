class Task < ActiveRecord::Base
  validates :project, :title, presence: true

  belongs_to :project
  has_many :comments, dependent: :destroy
end
