feature 'User removes a task' do
  given!(:user) { create(:user) }
  given!(:project) { create(:project, user: user) }
  given!(:task) { create(:task, project: project) }

  background do
    sign_in(user)
    sleep 0.5
  end

  scenario 'Remove a task', js: true do
    expect(page).to have_content task.title
    find("#task-#{task.id}").hover
    find("#del-task-#{task.id}").click
    expect(page).to_not have_content task.title
  end
end
