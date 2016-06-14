class Admin::ApplicationController < ActionController::Base

  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  layout "admin"

  before_action :authorize
  def current_moderator
    #fill the moderator obj only if @moderator is empty
    @moderator ||= Moderator.find(session[:current_moderator_id]) if session[:current_moderator_id]
  end

  def authorize
    unless current_moderator
      redirect_to "/login", alert: "Please login to view admin pages."
    end
  end

  #whenever the URL sends boolean parameters, it will come in as a string
  #we need a way to convert to bool so we we can use .where() function
  def to_bool str
    ActiveRecord::Type::Boolean.new.type_cast_from_user(str)
  end
end