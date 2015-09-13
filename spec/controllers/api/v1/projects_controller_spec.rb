RSpec.describe Api::V1::ProjectsController, type: :controller do
  describe 'GET #index' do
    it 'should return successful response' do
      get :index, format: :json
      expect(response).to be_success
    end

    it 'assigns all projects as @projects' do
      projects = create_list(:project, 3)
      get :index, forman: :json
      expect(assigns(:projects)).to match_array projects
    end
  end
end
