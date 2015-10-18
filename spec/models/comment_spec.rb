RSpec.describe Comment, type: :model do
  describe 'validation' do
    it { should validate_presence_of :task }
    it { should validate_presence_of :body }
  end

  describe 'associations' do
    it { should belong_to :task }
  end
end
