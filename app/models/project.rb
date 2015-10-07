class Project < ActiveRecord::Base
  validates :user, :title, presence: true

  belongs_to :user
  has_many :tasks, dependent: :destroy

  # default_scope { order(:priority) }
end
