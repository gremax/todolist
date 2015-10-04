module Api
  module V1
    class ProjectsController < ApplicationController
      load_and_authorize_resource

      def index
        render json: @projects, include: 'tasks'
      end
    end
  end
end
