feature 'User updates a project' do
  given!(:user) { create(:user) }
  given!(:project) { create(:project, user: user) }

  background do
    sign_in(user)
    visit root_path
    sleep 0.1
  end

  scenario 'User updates a project title', js: true do
    expect(page).to have_content project.title
    find('.view').double_click
    fill_in 'edit-project', with: 'My new project'
    find('#edit-project').native.send_keys(:return)
    expect(page).to have_content 'My new project'
  end
end
