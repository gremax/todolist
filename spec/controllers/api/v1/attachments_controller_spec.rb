RSpec.describe Api::V1::AttachmentsController, type: :controller do
  sign_in_user
  add_ability

  let!(:project) { create(:project, user: @user) }
  let!(:task) { create(:task, project: project) }
  let!(:comment) { create(:comment, task: task) }

  describe 'POST #create' do
    let(:attachment) { attributes_for(:attachment, comment: comment)}

    context 'cancan authorizes create' do
      before do
        @ability.cannot :create, Attachment
        post :create, format: :json, comment_id: comment,
          attachment: attachment['file']
      end

      it { expect(response).to be_forbidden }
    end

    describe 'with valid attributes' do
      it 'creates an attachment' do
        expect { post :create, format: :json, comment_id: comment,
         file: attachment[:file] }.to change(Attachment, :count).by(1)
      end
    end

    describe 'with invalid attributes' do
      it 'doesnt create an attachment' do
        expect { post :create, format: :json, comment_id: comment, file: nil }.
          to_not change(Attachment, :count)
      end

      it 'returns an error 422' do
        post :create, format: :json, comment_id: comment, file: nil
        expect(response.status).to eq 422
      end
    end
  end
end
