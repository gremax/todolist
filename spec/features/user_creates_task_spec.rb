feature 'User creates a task' do
  given!(:user) { create(:user) }
  given!(:project) { create(:project, user: user) }

  background do
    sign_in(user)
    sleep 0.1
  end

  scenario 'Add a new task', js: true do
    expect(page).to have_content project.title
    fill_in 'new-task', with: 'Buy milk'
    click_button 'Add task'
    expect(page).to have_content 'Buy milk'
  end
end
