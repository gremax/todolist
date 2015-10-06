module Api
  module V1
    class ProjectsController < ApplicationController
      before_filter :authenticate_user!
      load_and_authorize_resource

      respond_to :json

      def index
        respond_with :api, :v1, @projects, include: 'tasks'
      end

      def create
        respond_with :api, :v1, current_user.projects.create(project_params)
      end

      def destroy
        respond_with :api, :v1, @project.destroy
      end

      private

      def project_params
        params.require(:project).permit(:title, :tasks)
      end
    end
  end
end
