class Ability
  include CanCan::Ability

  def initialize(user)
    if user
      can :manage, Project, user: user
      can :manage, Task, project: { user_id: user.id }
      can :manage, Comment, task: { project: { user_id: user.id } }
    end
  end
end
