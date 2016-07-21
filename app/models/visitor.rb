class Visitor < ActiveRecord::Base
  has_many :notifications, as: :notifiable, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :messages, dependent: :destroy

  #validates visitor email, fullname
  validates :fullname, presence: true
  validates :email, format: { with: /@/, message: 'is not valid' }

  accepts_nested_attributes_for :comments
end
