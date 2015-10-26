module Api
  module V1
    class CommentsController < ApplicationController
      load_and_authorize_resource :task
      load_and_authorize_resource :comment, through: :task

      def index
        render json: @comments
      end

      def create
        @comment = @task.comments.create(comment_params)
        render json: @comment
      end

      def destroy
        respond_with @comment.destroy
      end

      private

      def comment_params
        params.permit(:body)
      end
    end
  end
end
