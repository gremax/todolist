class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  respond_to :json

  def angular
    render 'layouts/application' 
  end

  def default_serializer_options
    { root: false }
  end

  rescue_from CanCan::AccessDenied do |exception|
    render json: {error: exception.message}, status: :forbidden
  end
end
