feature 'User signs up' do

  background do
    visit new_user_registration_path
  end

  scenario 'User signs up with valid attributes' do
    within '#new_user' do
      fill_in 'user_email',    with: 'new_user@example.com'
      fill_in 'user_password', with: 'password'
      fill_in 'user_password_confirmation', with: 'password'
    end
    click_button 'Sign up'

    expect(page).
      to have_content 'Welcome! You have signed up successfully.'
  end

  scenario 'User signs up with invalid attributes' do
    within '#new_user' do
      fill_in 'user_email',    with: ''
      fill_in 'user_password', with: ''
      fill_in 'user_password_confirmation', with: ''
    end
    click_button 'Sign up'

    expect(page).
      to have_content 'errors prohibited this user from being saved'
  end
end
