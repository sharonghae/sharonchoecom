class Admin::ModeratorsController < Admin::ApplicationController
  def index
    @moderators = Moderator.all
  end

  def edit
    @moderator = Moderator.find(params[:id])
  end

  def update
    #find the specified moderator model
    @moderator = Moderator.find(params[:id])

    #if update is true, redirect back to the admin page
    if @moderator.update(moderator_params)
      flash[:notice] = "Moderator was successfully updated."
      redirect_to admin_moderators_url
    else
      flash[:alert] = "There was a problem updating moderator."
      render "edit"
    end
  end

  private

  #prevents the injection of malicious parameters
  def moderator_params
    params.require(:moderator).permit(:id, :fullname, :username, :password)
  end
end