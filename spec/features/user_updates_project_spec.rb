feature 'User updates a project' do
  given!(:user) { create(:user) }
  given!(:project) { create(:project, user: user) }

  background do
    sign_in(user)
  end

  scenario 'User updates a project title by double click', js: true do
    expect(page).to have_content project.title
    find('.view').double_click
    fill_in 'edit-project', with: 'My new project'
    find('#edit-project').native.send_keys(:return)
    expect(page).to have_content 'My new project'
  end

  scenario 'User updates a project title by button click', js: true do
    expect(page).to have_content project.title
    find("#project-#{project.id}").hover
    find("#edit-project-#{project.id}").click
    fill_in 'edit-project', with: 'My new project'
    find("#edit-project-#{project.id}").click
    expect(page).to have_content 'My new project'
  end
end
