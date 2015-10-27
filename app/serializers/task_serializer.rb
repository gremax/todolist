class TaskSerializer < ActiveModel::Serializer
  attributes :id, :title, :complete, :priority, :due_date

  has_many :comments
end
