FactoryGirl.define do
  factory :task do
    title "MyString"
    complete false
    priority 1
    due_date "2015-09-30"
    project nil
  end

end
