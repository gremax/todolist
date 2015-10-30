feature 'User signs up' do

  background do
    visit '/#/signup'
  end

  scenario 'User signs up with valid attributes', js: true do
    fill_in 'user_email',    with: 'new_user@example.com'
    fill_in 'user_password', with: 'password'
    fill_in 'user_password_confirmation', with: 'password'
    click_button 'Sign up'

    expect(page).
      to have_content 'Welcome aboard!'
  end

  scenario 'User signs up with invalid attributes', js: true do
    fill_in 'user_email',    with: 'test@test'
    fill_in 'user_password', with: ''
    fill_in 'user_password_confirmation', with: ''
    click_button 'Sign up'

    expect(page).
      to have_content 'Email is not an email'
  end
end
