RSpec.describe Comment, type: :model do
  describe 'validation' do
    it { should validate_presence_of :task }
    it { should validate_presence_of :body }
  end

  describe 'associations' do
    it { should belong_to :task }
    it { should have_many(:attachments).dependent(:destroy) }
  end

  describe 'attachments' do
    before do
      @comment = create(:comment)
    end

    it 'should have multiple attachments' do
      expect { @comment.attachments.create(file: File.open(File.join(Rails.root,
        '/spec/support/uploads/rg_test_task_grid.png'))) }.
        to change(@comment.attachments, :count).by(1)
    end
  end
end
