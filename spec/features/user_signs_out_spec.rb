feature 'User signs out' do
  given(:user) { create(:user) }

  background do
    sign_in(user)
    sleep 2
  end

  scenario 'Registered user tries to sign out' do
    click_on 'Sign out'

    expect(page).to have_content 'Bye'
    expect(current_path).to eq '/#/signin'
  end
end
