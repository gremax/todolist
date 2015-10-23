Rails.application.routes.draw do
  root to: 'application#angular'
  mount_devise_token_auth_for 'User', at: 'auth'
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :projects, only: [:index, :show, :create, :update, :destroy] do
        resources :tasks, only: [:index, :create, :update, :destroy]
      end
    end
  end
end
