class Admin::CommentsController < Admin::ApplicationController
  def index
    @comments = Comment.where(status: to_bool(params[:status]))
  end

  def update
  end

  def destroy
  end
end
