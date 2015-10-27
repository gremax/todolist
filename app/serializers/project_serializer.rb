class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :title, :priority

  has_many :tasks
end
