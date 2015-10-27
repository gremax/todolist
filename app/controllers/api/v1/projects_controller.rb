module Api
  module V1
    class ProjectsController < ApplicationController
      load_and_authorize_resource

      def index
        respond_with @projects
      end

      def show
        respond_with @project
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
