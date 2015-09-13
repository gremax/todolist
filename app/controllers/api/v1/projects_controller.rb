module Api
  module V1
    class ProjectsController < ApplicationController
      def index
        @projects = Project.all.order('priority ASC')
        render json: @projects
      end
    end
  end
end
