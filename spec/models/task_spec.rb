require 'rails_helper'

RSpec.describe Task, type: :model do
  describe 'validation' do
    it { should validate_presence_of :title }
  end

  describe 'association' do
    it { should belong_to :project }
  end
end
