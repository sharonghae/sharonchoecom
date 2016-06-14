class Admin::TagsController < Admin::ApplicationController
  def new
    @tag = Tag.new
    @tags = Tag.all.order(id: :desc)
  end

  def create
    tag_params[:name].split(",").map do |n|
      Tag.new(name: n).save
    end

    redirect_to new_admin_tag_url, notice: "Tag was successfully created."
  end

  def edit
    @tag = Tag.find(params[:id])
  end

  def update
    @tag = Tag.find(params[:id])
    if @tag.update tag_params
      redirect_to new_admin_tag_url, notice: "Successfully updated the tag."
    else
      flash[:alert] = "There was an error updating tag."
      render :edit
    end
  end

  def show
  end

  def destroy
    @tag = Tag.find(params[:id])
    @tag.destroy

    redirect_to :back, notice: "Successfully deleted tag."
  end

  #prepare strong parameters
  private

  def tag_params
    params.require(:tag).permit(:id, :name)
  end

end
