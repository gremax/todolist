FactoryGirl.define do
  factory :project do
    title { Faker::Lorem.sentence }
    priority 1
    user
  end

  factory :project_invalid, class: Project do
    title ''
    user
  end

end
