Rails.application.routes.draw do
  # devise_for :users
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api do
    namespace :v1 do
      resources :books, only: [:index, :show, :create]
    end
  end

  get 'locales/:locale/translation', to: 'translations#show'

  mount ActionCable.server => '/cable'
end
