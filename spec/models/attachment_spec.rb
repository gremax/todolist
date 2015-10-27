RSpec.describe Attachment, type: :model do
  describe 'validation' do
    it { should validate_presence_of :file }
    it { should validate_presence_of :comment }
  end

  describe 'association' do
    it { should belong_to :comment }
  end
end
