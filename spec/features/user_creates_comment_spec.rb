feature 'User creates comment' do
  given!(:user) { create(:user) }
  given!(:project) { create(:project, user: user) }
  given!(:task) { create(:task, project: project) }

  background do
    sign_in(user)
  end

  scenario 'Authorized user creates a comment with valid attrs', js: true do
    find("#task-#{task.id}").hover
    find("#comment-task-#{task.id}").click
    fill_in 'new-comment', with: 'Urgently!'
    click_button 'Add comment'
    expect(page).to have_content 'Urgently!'
  end
end
