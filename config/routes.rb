Rails.application.routes.draw do
  devise_for :users
  root to: 'application#index'
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :projects
    end
  end
end
