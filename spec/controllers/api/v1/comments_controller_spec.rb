RSpec.describe Api::V1::CommentsController, type: :controller do
  sign_in_user
  add_ability

  let!(:project) { create(:project, user: @user) }
  let!(:task) { create(:task, project: project) }

  describe 'GET #index' do
    let!(:comments) { create_list(:comment, 3, task: task) }

    context 'cancan authorizes index' do
      before do
        @ability.cannot :read, Comment
        get :index, task_id: task
      end

      it { expect(response).to be_forbidden }
    end

    it 'should return successful response' do
      get :index, format: :json, task_id: task
      expect(response).to be_success
    end

    it 'assigns all comments as @comments' do
      get :index, format: :json, task_id: task
      expect(assigns(:comments)).to match_array comments
    end
  end

  describe 'POST #create' do
    let(:comment) { attributes_for(:comment, task: task) }

    context 'cancan authorizes create' do
      before do
        @ability.cannot :create, Comment
        post :create, format: :json, task_id: task, body: comment[:body]
      end

      it { expect(response).to be_forbidden }
    end

    describe 'with valid attributes' do
      it 'creates a comment' do
        expect { post :create, format: :json, task_id: task,
          body: comment[:body] }.to change(Comment, :count).by(1)
      end
    end

    describe 'with invalid attributes' do
      it 'doesnt create a comment' do
        expect { post :create, format: :json, task_id: task, body: '' }.
          to_not change(Comment, :count)
      end

      it 'returns an error 422' do
        post :create, format: :json, task_id: task, body: ''
        expect(response.status).to eq 422
      end
    end
  end

  describe 'DELETE #destroy' do
    let!(:comment) { create(:comment, task: task) }

    context 'cancan authorizes destroy' do
      before do
        @ability.cannot :destroy, Comment
        delete :destroy, format: :json, id: comment
      end

      it { expect(response).to be_forbidden }
    end

    it 'deletes a comment' do
      expect{ delete :destroy, format: :json, id: comment }.
        to change(Comment, :count).by(-1)
    end
  end
end
