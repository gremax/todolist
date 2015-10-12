feature 'User creates a project' do
  given!(:user) { create(:user) }

  background do
    sign_in(user)
    sleep 0.1
  end

  scenario 'Add a new project', js: true do
    find('#new-project').click
    fill_in 'Add a new project', with: 'Some cool project'
    click_button 'Add project'
    expect(page).to have_content 'Some cool project'
  end
end
