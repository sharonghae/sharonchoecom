class Post < ActiveRecord::Base
  has_many :comments, dependent: :destroy
  has_many :post_tags, dependent: :destroy
  has_many :tags, through: :post_tags
  belongs_to :moderator

  #form validation
  validates :title, presence: true
  validates :content, presence: true

  #only show active posts
  scope :published, -> { where(publish: true).order(id: :desc) }

  # class method for searching title or content of post
  def self.matching_title_or_content search
    where("title LIKE ? OR content LIKE ?", "%#{search}%", "%#{search}}%")
  end

  #filter all posts by a given tag, feeds it to the view via the controller
  def self.filter_by_tags param_tag
    includes(:tags).where(publish: true, tags: {name: param_tag}).order(id: :desc)
  end
end
