module Api
  module V1
    class ProjectsController < ApplicationController
      before_filter :authenticate_user!
      load_and_authorize_resource

      respond_to :json

      def index
        @projects = Project.order(:priority)
        render json: @projects, include: 'tasks'
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
        params.require(:project).permit(:title, :priority, :tasks)
      end
    end
  end
end
