feature 'User updates a task' do
  given!(:user) { create(:user) }
  given!(:project) { create(:project, user: user) }
  given!(:task) { create(:task, project: project) }

  background do
    sign_in(user)
    visit root_path
    sleep 0.5
  end

  scenario 'User updates a task title by double click', js: true do
    expect(page).to have_content task.title
    find("#task-#{task.id} .view").double_click
    fill_in 'edit-task', with: 'My new task'
    find('#edit-task').native.send_keys(:return)
    expect(page).to have_content 'My new task'
  end

  scenario 'User updates a task title by button click', js: true do
    expect(page).to have_content task.title
    find("#task-#{task.id}").hover
    find("#edit-task-#{task.id}").click
    fill_in 'edit-task', with: 'My new task'
    find("#edit-task-#{task.id}").click
    expect(page).to have_content 'My new task'
  end
end
