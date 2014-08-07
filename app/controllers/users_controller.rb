class UsersController < ApplicationController

	before_action :set_user, except: [:index, :toggle_follow_user]
	before_action :get_user_relationships, except: [:index, :toggle_follow_user]

	def index
		redirect_to root_path
	end

	def show
	end

	def set_user
		unless params[:id].blank?
			@user = User.find(params[:id])
		else
			redirect_to root_path
		end
	end

	def get_user_relationships
		relationships = Relationship.all
		@all_users = User.all
		@all_users -= [@user]

		@following = []
		@followed_by = []
		@full_follow = []
		@non_follow = []

		relationships.each do |rel|
			if rel.owner_id == @user.id
				@following << User.find(rel.target_id)
			elsif rel.target_id == @user.id
				@followed_by << User.find(rel.owner_id)
			end
		end
		@non_follow = ((@all_users - @following) - @followed_by)
		@following.each do |user|
			if @followed_by.include? user
				@full_follow << user
			end
		end
		@following -= @full_follow
		@followed_by -= @full_follow
	end

	def toggle_follow_user
		owner_id = params[:owner_id]
		target_id = params[:target_id]
		owner = User.find(owner_id)
		target = User.find(target_id)

		rel = Relationship.where(:owner_id => owner_id, :target_id => target_id).first
		unless rel.present?

			error_messages = []
			( owner_id == target_id ) && error_messages << "User cannot follow self"
			( owner.blank? || target.blank? ) && error_messages << "User does not exist"
			( owner_id == target_id ) && error_messages << "User cannot follow self"
			if error_messages.length > 0
				error_messages = error_messages.joint(', ')
				render :json => {error_messages: error_messages}
			else
				new_rel = Relationship.new(:owner_id => owner_id, :target_id => target_id)
				if new_rel.save
					success_message = ("Success! "+owner.name+" is now following "+target.name).to_s
					render :json => {success_message: success_message}
				end
			end
		else
			rel.destroy
			success_message = ("Success! "+owner.name+" is no longer following "+target.name).to_s
			render :json => {success_message: success_message}
		end
	end
end