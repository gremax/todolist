class Project < ActiveRecord::Base
  validates :user, :title, presence: true

  belongs_to :user
end
