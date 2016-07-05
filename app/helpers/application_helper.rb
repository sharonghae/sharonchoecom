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

  def double_digit_number n
    "%02d" % n
  end

  def copyright_notice_year_range start_year
    #in case the input was not a number
    start_year = start_year.to_i

    #get the current year from the system
    current_year = Time.new.year

    #when the current year is more recent than the start year, return a string of a range
    #alternatively, as long as the start year is reasonable, return it as a string
    #otherwise, return the current year from the system
    if current_year > start_year && start_year > 2000
      "#{start_year} - #{current_year}"
    elsif start_year > 2000
       "#{start_year}"
    else
      "#{current_year}"
    end
  end
end
