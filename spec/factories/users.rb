FactoryGirl.define do
  factory :user do
    provider 'email'
    email    { Faker::Internet.email }
    password { Faker::Internet.password }
    password_confirmation { password }
  end

end
