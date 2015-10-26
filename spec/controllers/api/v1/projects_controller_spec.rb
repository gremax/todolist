RSpec.describe Api::V1::ProjectsController, type: :controller do
  sign_in_user
  add_ability

  describe 'GET #index' do
    let!(:projects) { create_list(:project, 3, user: @user) }

    context 'cancan authorizes index' do
      before do
        @ability.cannot :read, Project
        get :index
      end

      it { expect(response).to be_forbidden }
    end

    it 'should return successful response' do
      get :index, format: :json
      expect(response).to be_success
    end

    it 'assigns all projects as @projects' do
      get :index, format: :json
      expect(assigns(:projects)).to match_array projects
    end
  end

  describe 'POST #create' do
    context 'cancan authorizes create' do
      before do
        @ability.cannot :create, Project
        post :create, format: :json, title: 'New project'
      end

      it { expect(response).to be_forbidden }
    end

    describe 'with valid attributes' do
      it 'creates a project' do
        expect { post :create, format: :json, title: 'New project' }.
          to change(Project, :count).by(1)
      end
    end

    describe 'with invalid attributes' do
      it 'doesnt create a project' do
        expect { post :create, format: :json, title: '' }.
          to_not change(Project, :count)
      end

      it 'returns an error 422' do
        post :create, format: :json, title: ''
        expect(response.status).to eq 422
      end
    end
  end

  describe 'PATCH #update' do
    let!(:project) { create(:project, user: @user) } 
    let(:project_update) { attributes_for(:project, user: @user) }

    context 'cancan authorizes update' do
      before do
        @ability.cannot :update, Project
        patch :update, format: :json, id: project, title: project_update[:title]
      end

      it { expect(response).to be_forbidden }
    end

    describe 'with valid attributes' do
      it 'doesnt change a projects count' do
        expect { patch :update, format: :json, id: project,
          title: project_update[:title] }.to_not change(Project, :count)
      end

      it 'updates a project' do
        patch :update, format: :json, id: project, title: project_update[:title]
        expect(project.reload.title).to eq project_update[:title]
      end
    end

    describe 'with invalid attributes' do
      it 'doesnt update a project' do
        patch :update, format: :json, id: project, title: ''
        expect(project.reload.title).not_to be_empty
      end
    end
  end

  describe 'DELETE #destroy' do
    let!(:project) { create(:project, user: @user) }

    context 'cancan authorizes destroy' do
      before do
        @ability.cannot :destroy, Project
        delete :destroy, format: :json, id: project
      end

      it { expect(response).to be_forbidden }
    end

    it 'deletes a project' do
      expect{ delete :destroy, format: :json, id: project }.
        to change(Project, :count).by(-1)
    end
  end
end
