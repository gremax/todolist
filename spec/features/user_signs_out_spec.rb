feature 'User signs out' do

  given(:user) { create(:user) }

  background do
    sign_in(user)
  end

  scenario 'Registered user tries to sign out' do
    click_on 'Sign out'

    expect(page).to have_content 'Signed out successfully.'
    expect(current_path).to eq root_path
  end
end
