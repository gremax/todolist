feature 'User signs in' do
  given(:user) { create(:user) }

  scenario 'Registered user tries to sign in', js: true do
    sign_in(user)

    expect(page).to have_content 'Signed in successfully.'
    expect(page).to have_content 'Sign out'
  end

  scenario 'Non-registered user tries to sign in', js: true do
    visit '/#/login'
    fill_in 'Email',    with: 'wrong_user@example.com'
    fill_in 'Password', with: '12345678'
    click_button 'Sign in'

    expect(page).to have_content 'Invalid login credentials'
  end
end
