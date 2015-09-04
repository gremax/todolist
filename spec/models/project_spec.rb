require 'rails_helper'

RSpec.describe Project, type: :model do
  describe 'validation' do
    it { should validate_presence_of :user }
    it { should validate_presence_of :name }
  end
end
