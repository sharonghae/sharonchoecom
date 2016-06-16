Rails.application.routes.draw do

  #root to: "posts#index"
  root to: "pages#home"

  #section: FRONT END ROUTES
  resources :posts, only: [:index, :show]
  resources :messages, only: [:new, :create]
  resources :comments, only: [:create]

  #ront end static routes
  match ":action" => "pages", via: :get

  #section: ADMIN ROUTES

  #remap get requests to the controller
  get "/login" => "admin/sessions#new"

  #log out of the app
  get "/logout" => "admin/sessions#destroy"

  #create a route to /admin/
  namespace :admin do
    #route: admin/dashboard
    resources :dashboard, only: [:index]

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

    #route: admin/visitors
    resources :visitors, only: [:index, :destroy]

    #route: admin/messages
    resources :messages, only: [:index, :show, :update, :destroy]

    #route: admin/notifications
    resources :notifications, only: [:index, :destroy]

    #route: admin/settings
    resources :settings, only: [:new, :create, :edit, :update]
  end

  #if the url matches 'dismiss_all etc..', then forward it to #delete_all method
  match "dismiss_all_notifications", to: "admin/notifications#delete_all", via: :delete

end