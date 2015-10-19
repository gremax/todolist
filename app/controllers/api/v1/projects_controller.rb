module Api
  module V1
    class ProjectsController < ApplicationController
      before_filter :authenticate_user!
      load_and_authorize_resource

      respond_to :json

      def index
        render json: @projects, include: 'tasks'
      end

      def show
        render json: @project
      end

      def create
        respond_with :api, :v1, current_user.projects.create(project_params)
      end

      def update
        respond_with @project.update(project_params)
      end

      def destroy
        respond_with @project.destroy
      end

      private

      def project_params
        params.permit(:title, :priority, :tasks)
      end
    end
  end
end
