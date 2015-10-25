feature 'User signs out' do
  given(:user) { create(:user) }

  background do
    sign_in(user)
  end

  scenario 'Registered user tries to sign out', js: true do
    click_on 'Sign out'

    expect(page).to have_content 'Sign in'
    expect(page).to_not have_content 'Sign out'
  end
end
