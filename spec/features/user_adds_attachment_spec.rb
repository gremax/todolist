feature 'User adds attachment' do
  given!(:user) { create(:user) }
  given!(:project) { create(:project, user: user) }
  given!(:task) { create(:task, project: project) }

  background do
    sign_in(user)
  end

  xscenario 'Authorized user adds an attachment', js: true do
    find("#task-#{task.id}").hover
    find("#comment-task-#{task.id}").click
    fill_in 'new-comment', with: 'Urgently!'
    attach_file 'Attach files', "#{Rails.root}/spec/support/uploads/rg_test_task_grid.png"
    expect(page).to have_content 'rg_test_task_grid.png'
    click_button 'Add comment'
    visit '/#/projects'
    find("#task-#{task.id}").hover
    find("#comment-task-#{task.id}").click
    expect(page).to have_content 'Urgently!'
    expect(page).to have_css "a[href='rg_test_task_grid.png']"
  end
end
