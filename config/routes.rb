Rails.application.routes.draw do
  devise_for :users
  root to: 'application#index'
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :projects, only: [:index, :create, :destroy] do
        resources :tasks, only: [:create, :update, :destroy]
      end
    end
  end
end
