RSpec.describe Project, type: :model do
  describe 'validation' do
    it { should validate_presence_of :user }
    it { should validate_presence_of :title }
  end

  describe 'associations' do
    it { should belong_to :user }
    it { should have_many(:tasks).dependent(:destroy) }
  end
end
