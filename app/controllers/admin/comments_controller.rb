class Admin::CommentsController < Admin::ApplicationController
  def index
    #if the search params is present in the INDEX request,
    #then do a search on comments for full name or message matching the query
    if params[:search].present?
      @comments = Comment.matching_fullname_or_message(params[:search]).page params[:page]
    else
      @comments = Comment.where(status: to_bool(params[:status])).page params[:page]
    end
  end

  def update
    @comment = Comment.find(params[:id])
    if @comment.update(status: params[:status])
      redirect_to :back, notice: "Successfully updated the comment."
    else
      redirect_to :back, notice: "There was a problem updating the comment."
    end
  end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy

    redirect_to :back, notice: "Successfully deleted the comment."
  end
end
