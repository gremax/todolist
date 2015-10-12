RSpec.describe Api::V1::TasksController, type: :controller do
  sign_in_user

  before(:each) do
    @ability = Object.new
    @ability.extend(CanCan::Ability)
    allow(@controller).to receive(:current_ability).and_return(@ability)
    @ability.can :manage, :all
  end

  let!(:project) { create(:project, user: @user) }

  describe 'POST #create' do
    let(:task) { attributes_for(:task, project: project) }
    let(:task_invalid) { attributes_for(:task_invalid, project: project) }

    context 'cancan authorizes create' do
      before do
        @ability.cannot :create, Task
        post :create, format: :json, project_id: project, task: task
      end

      it { expect(response).to be_forbidden }
    end

    describe 'with valid attributes' do
      it 'creates a task' do
        expect { post :create, format: :json, project_id: project, task: task }.
          to change(Task, :count).by(1)
      end
    end

    describe 'with invalid attributes' do
      it 'doesnt create a task' do
        expect { post :create, format: :json, project_id: project, task: task_invalid }.
          to_not change(Task, :count)
      end

      it 'returns an error 422' do
        post :create, format: :json, project_id: project, task: task_invalid
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
        patch :update, format: :json, project_id: project, id: task,
          task: task_update
      end

      it { expect(response).to be_forbidden }
    end

    describe 'with valid attributes' do
      it 'doesnt change a tasks count' do
        expect { patch :update, format: :json, project_id: project, id: task,
          task: task_update }.to_not change(Task, :count)
      end

      it 'updates a task' do
        patch :update, format: :json, project_id: project, id: task,
          task: task_update
        expect(task.reload.title).to eq task_update[:title]
      end
    end

    describe 'with invalid attributes' do
      it 'doesnt update a task' do
        patch :update, format: :json, project_id: project, id: task,
          task: { title: ''}
        expect(task.reload.title).not_to be_empty
      end
    end
  end

  describe 'DELETE #destroy' do
    let!(:task) { create(:task, project: project) } 

    context 'cancan authorizes destroy' do
      before do
        @ability.cannot :destroy, Task
        delete :destroy, format: :json, project_id: project, id: task
      end

      it { expect(response).to be_forbidden }
    end

    it 'deletes a task' do
      expect{ delete :destroy, format: :json, project_id: project, id: task }.
        to change(Task, :count).by(-1)
    end
  end
end
