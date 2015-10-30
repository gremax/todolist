feature 'User adds attachment' do
  given!(:user) { create(:user) }
  given!(:project) { create(:project, user: user) }
  given!(:task) { create(:task, project: project) }

  background do
    sign_in(user)
  end

  scenario 'Authorized user adds an attachment', js: true do
    find("#task-#{task.id}").hover
    find("#comment-task-#{task.id}").click
    fill_in 'new-comment', with: 'Test comment'
    attach_file 'attachment', "#{Rails.root}/spec/support/uploads/rg_test_task_grid.png"
    expect(page).to have_content 'rg_test_task_grid.png'
    click_button 'Add comment'
    expect(page).to have_content 'Test comment'
    expect(page).to have_link 'rg_test_task_grid.png'
  end
end
