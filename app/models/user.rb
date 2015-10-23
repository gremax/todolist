class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :trackable, :validatable

  include DeviseTokenAuth::Concerns::User

  validates :email, uniqueness: { case_sensitive: false }

  has_many :projects, dependent: :destroy
end
