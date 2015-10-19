Rails.application.routes.draw do
  devise_for :users
  root to: 'application#angular'
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :projects, only: [:index, :show, :create, :update, :destroy] do
        resources :tasks, only: [:index, :create, :update, :destroy]
      end
    end
  end
end
