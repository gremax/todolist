class CommentSerializer < ActiveModel::Serializer
  attributes :id, :body

  has_many :attachments
end
