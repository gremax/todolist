User.destroy_all
Task.destroy_all
Project.destroy_all

user = User.create!(email: "user@example.com",password: "password", password_confirmation: "password")

first  = Project.create!(title: "Complete the test task for Ruby Garage", user_id: user.id)
second = Project.create!(title: "For Home", user_id: user.id)
third  = Project.create!(title: "Learn Ruby", user_id: user.id)

Task.create!([
  { title: "Open this mock-up in Adobe Fireworks", project_id: first.id },
  { title: "Attentively check the file", project_id: first.id },
  { title: "Write HTML & CSS", project_id: first.id },
  { title: "Add Javascript to implement adding / editing/ removing for todo items and lists taking into account as more use cases as possible", project_id: first.id },
  { title: "Buy fishing supplies", project_id: second.id },
  { title: "Call Mom", project_id: second.id },
  { title: "Clean the room", project_id: second.id },
  { title: "Repair the DVD Player", project_id: second.id },
  { title: "Haml & Slim", project_id: third.id },
  { title: "Deploy with Ansible", project_id: third.id },
  { title: "PostgreSQL", project_id: third.id }
])

puts "Added #{Project.count} projects with #{Task.count} tasks for #{user.email}"
