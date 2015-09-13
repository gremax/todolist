User.destroy_all
Project.destroy_all

user = User.create!(email: "user@example.com",password: "password", password_confirmation: "password")

Project.create!(title: "Todolist tasks", user_id: user.id)
Project.create!(title: "For Home", user_id: user.id)
Project.create!(title: "Fishing", user_id: user.id)

puts "Created #{Project.count} projects."
