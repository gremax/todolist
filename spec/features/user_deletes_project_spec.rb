feature 'User removes a project' do
  given!(:user) { create(:user) }
  given!(:project) { create(:project, user: user) }

  background do
    sign_in(user)
    sleep 0.1
  end

  scenario 'Remove an exist project', js: true do
    expect(page).to have_content project.title
    find("#project-#{project.id}").hover
    find("#del-project-#{project.id}").click
    expect(page).to_not have_content project.title
  end
end
