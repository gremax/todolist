class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new

    can :manage, Project, user: user
    can :manage, Task, project: { id: user.project_ids }
  end
end
