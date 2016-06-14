Rails.application.routes.draw do
  #remap get requests to the controller
  get "/login" => "admin/sessions#new"

  #log out of the app
  get "/logout" => "admin/sessions#destroy"

  #create a route to /admin/
  namespace :admin do
    #route: /admin/sessions, create, new, destroy
    resources :sessions, only: [:new, :create, :destroy]

    #route: /admin/moderators
    resources :moderators, only: [:index, :edit, :update]

    #route: to posts controller
    resources :posts

    #route: comments controller
    resources :comments, only: [:index, :update, :destroy]

    #route: admin/tags
    resources :tags, except: [:index]
  end
end