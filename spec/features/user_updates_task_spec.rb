feature 'User updates a task' do
  given!(:user) { create(:user) }
  given!(:project) { create(:project, user: user) }
  given!(:task) { create(:task, project: project) }

  background do
    sign_in(user)
    visit root_path
    sleep 0.1
  end

  scenario 'User updates a task title', js: true do
    expect(page).to have_content task.title
    find('.view').double_click
    fill_in 'edit-task', with: 'My new task'
    find('#edit-task').native.send_keys(:return)
    expect(page).to have_content 'My new task'
  end
end
