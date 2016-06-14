module ApplicationHelper
  def convert_status(status, truthy: "Active", falsey: "Pending")
    if status
      truthy
    else
      falsey
    end
  end

  def time_ago time
    "#{time_ago_in_words(time)} ago"
  end
end