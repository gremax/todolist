module ControllersSpecHelper
  def sign_in_user
    before do
      @user = create(:user)
      @request.env['devise.mapping'] = Devise.mappings[:user]
      sign_in @user
    end
  end

  def add_ability
    before do
      @ability = Object.new
      @ability.extend(CanCan::Ability)
      allow(@controller).to receive(:current_ability).and_return(@ability)
      @ability.can :manage, :all
    end
  end
end
