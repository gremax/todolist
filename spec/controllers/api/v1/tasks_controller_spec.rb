RSpec.describe Api::V1::TasksController, type: :controller do
  sign_in_user
  add_ability

  let!(:project) { create(:project, user: @user) }

  describe 'GET #index' do
    let!(:tasks) { create_list(:task, 3, project: project) }

    context 'cancan authorizes index' do
      before do
        @ability.cannot :read, Task
        get :index, project_id: project
      end

      it { expect(response).to be_forbidden }
    end

    it 'should return successful response' do
      get :index, format: :json, project_id: project
      expect(response).to be_success
    end

    it 'assigns all tasks as @tasks' do
      get :index, format: :json, project_id: project
      expect(assigns(:tasks)).to match_array tasks
    end
  end

  describe 'POST #create' do
    let(:task) { attributes_for(:task, project: project) }

    context 'cancan authorizes create' do
      before do
        @ability.cannot :create, Task
        post :create, format: :json, project_id: project, title: task[:title]
      end

      it { expect(response).to be_forbidden }
    end

    describe 'with valid attributes' do
      it 'creates a task' do
        expect { post :create, format: :json, project_id: project,
          title: task[:title] }.to change(Task, :count).by(1)
      end
    end

    describe 'with invalid attributes' do
      it 'doesnt create a task' do
        expect { post :create, format: :json, project_id: project, title: '' }.
          to_not change(Task, :count)
      end

      it 'returns an error 422' do
        post :create, format: :json, project_id: project, title: ''
        expect(response.status).to eq 422
      end
    end
  end

  describe 'PATCH #update' do
    let!(:task) { create(:task, project: project) }
    let(:task_update) { attributes_for(:task, project: project) }

    context 'cancan authorizes update' do
      before do
        @ability.cannot :update, Task
        patch :update, format: :json, id: task, task: task_update
      end

      it { expect(response).to be_forbidden }
    end

    describe 'with valid attributes' do
      it 'doesnt change a tasks count' do
        expect { patch :update, format: :json, id: task,
          title: task_update[:title] }.to_not change(Task, :count)
      end

      it 'updates a task' do
        patch :update, format: :json, id: task, title: task_update[:title]
        expect(task.reload.title).to eq task_update[:title]
      end
    end

    describe 'with invalid attributes' do
      it 'doesnt update a task' do
        patch :update, format: :json, id: task, task: { title: ''}
        expect(task.reload.title).not_to be_empty
      end
    end
  end

  describe 'DELETE #destroy' do
    let!(:task) { create(:task, project: project) }

    context 'cancan authorizes destroy' do
      before do
        @ability.cannot :destroy, Task
        delete :destroy, format: :json, id: task
      end

      it { expect(response).to be_forbidden }
    end

    it 'deletes a task' do
      expect{ delete :destroy, format: :json, id: task }.
        to change(Task, :count).by(-1)
    end
  end
end
