class Moderator < ActiveRecord::Base
  has_secure_password

  #a moderator has many posts, has_many is a ruby object, also valid: has_many(:posts)
  has_many :posts

  #model validation segment
  validates :fullname, presence: true
  validates :username, presence: true, format: {with: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i, message: "is not valid."}
  validates :password, presence: true
end