FactoryGirl.define do
  factory :task do
    title { Faker::Lorem.sentence }
    complete false
    priority 1
    due_date { Time.now }
    project
  end

  factory :task_invalid, class: Task do
    title ''
  end

end
