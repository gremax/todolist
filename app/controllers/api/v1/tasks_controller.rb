module Api
  module V1
    class TasksController < ApplicationController
      load_and_authorize_resource :project
      load_and_authorize_resource :task, through: :project

      def index
        render json: @tasks
      end

      def create
        respond_with :api, :v1, @project, @project.tasks.create(task_params)
      end

      def update
        respond_with @task.update(task_params)
      end

      def destroy
        respond_with @task.destroy
      end

      private

      def task_params
        params.permit(:title, :complete, :priority, :due_date)
      end
    end
  end
end
