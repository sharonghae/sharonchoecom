class Admin::PostsController < Admin::ApplicationController
  def index
    #if we have made a search
    if params[:search].present?
      @posts = Post.matching_title_or_content(params[:search]).page(params[:page]).per(10)
    else
      @posts = Post.all.order(id: :desc).page(params[:page]).per(10)
    end
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    @post.moderator_id = current_moderator.id

    if @post.save
      redirect_to admin_posts_url, notice: "Post was successfully created."
    else
      flash[:alert] = "There was an error while creating the new post."
      render :new
    end
  end

  def edit
  end

  def update
  end

  def show
    @post = Post.find(params[:id])
  end

  def destroy
  end

  private

  def post_params
    params.require(:post).permit(:id, :title, :content, :publish, tag_ids: [])
  end
end
