Rails.application.routes.draw do
  # devise_for :users
  mount_devise_token_auth_for 'User', at: 'auth'
  mount ActionCable.server => '/cable'

  namespace :api do
    namespace :v1 do
      resources :books, only: [:index, :show, :create]
    end
  end

  get 'locales/:locale/translation', to: 'translations#show'

  root to: redirect('/index.html')
  get '*unmatched_route', to: redirect('/index.html'), constraints: ->(request) do
    # needed for react-router to work
    !request.xhr? && request.format.html?
  end
end
