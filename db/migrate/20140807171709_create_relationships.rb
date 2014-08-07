class CreateRelationships < ActiveRecord::Migration
  def change
    create_table :relationships do |t|
      t.integer :owner_id
      t.integer :target_id
    end
  end
end
