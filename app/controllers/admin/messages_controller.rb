class Admin::MessagesController < Admin::ApplicationController
  def index
    @messages = Message.all.order(id: :desc).page params[:page]
  end

  def show
  end

  def update
  end

  def destroy
  end
end
