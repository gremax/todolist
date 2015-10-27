feature 'User removes comment' do
  given!(:user) { create(:user) }
  given!(:project) { create(:project, user: user) }
  given!(:task) { create(:task, project: project) }
  given!(:comment) { create(:comment, task: task) }

  background do
    sign_in(user)
  end

  xscenario 'Authorized user removes a comment', js: true do
    find("#task-#{task.id}").hover
    find("#comment-task-#{task.id}").click
    expect(page).to have_content comment.body
    find("#comment-#{comment.id}").hover
    find("#del-comment-#{comment.id}").click
    expect(page).to_not have_content comment.body
  end
end
