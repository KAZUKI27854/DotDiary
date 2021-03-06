class Document < ApplicationRecord
  belongs_to :user
  belongs_to :goal

  validates :body, { presence: true, length: { maximum: 300 } }
  validates :milestone, { presence: true, length: { maximum: 100 } }
  validates :add_level, presence: true

  attachment :document_image

  def self.search(keyword)
    where('body LIKE(?)', "%#{keyword}%")
  end
end
