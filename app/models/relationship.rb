class Relationship < ActiveRecord::Base
	belongs_to :user, class_name: 'Owner ID'
	has_one :user, class_name: 'Target ID'
end