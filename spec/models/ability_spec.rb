require 'cancan/matchers'

RSpec.describe Ability, type: :model do
  subject { ability }
  let(:ability) { Ability.new(user) }

  describe 'abilities of guest' do
    let(:user) { nil }

    context 'for projects' do
      let(:project) { create(:project) }

      it { expect(ability).not_to be_able_to(:read, project) }
      it { expect(ability).not_to be_able_to(:create, Project) }
      it { expect(ability).not_to be_able_to(:update, project) }
      it { expect(ability).not_to be_able_to(:destroy, project) }
    end

    context 'for tasks' do
      let(:task) { create(:task) }

      it { expect(ability).not_to be_able_to(:read, task) }
      it { expect(ability).not_to be_able_to(:create, Task) }
      it { expect(ability).not_to be_able_to(:update, task) }
      it { expect(ability).not_to be_able_to(:destroy, task) }
    end

    context 'for comments' do
      let(:comment) { create(:comment) }

      it { expect(ability).not_to be_able_to(:read, comment) }
      it { expect(ability).not_to be_able_to(:create, Comment) }
      it { expect(ability).not_to be_able_to(:update, comment) }
      it { expect(ability).not_to be_able_to(:destroy, comment) }
    end

    context 'for attachments' do
      let(:attachment) { create(:attachment) }

      it { expect(ability).not_to be_able_to(:read, attachment) }
      it { expect(ability).not_to be_able_to(:create, Attachment) }
      it { expect(ability).not_to be_able_to(:update, attachment) }
      it { expect(ability).not_to be_able_to(:destroy, attachment) }
    end
  end

  describe 'abilities of user' do
    let(:user) { create(:user) }

    context 'for projects' do
      let(:project) { create(:project, user: user) }

      it { expect(ability).to be_able_to(:read, project) }
      it { expect(ability).to be_able_to(:create, Project) }
      it { expect(ability).to be_able_to(:update, project) }
      it { expect(ability).to be_able_to(:destroy, project) }
    end

    context 'for tasks' do
      let!(:task) { create(:task, project: create(:project, user: user)) }

      it { expect(ability).to be_able_to(:read, task) }
      it { expect(ability).to be_able_to(:create, Task) }
      it { expect(ability).to be_able_to(:update, task) }
      it { expect(ability).to be_able_to(:destroy, task) }
    end

    context 'for comments' do
      let!(:task) { create(:task, project: create(:project, user: user)) }
      let!(:comment) { create(:comment, task: task) }

      it { expect(ability).to be_able_to(:read, comment) }
      it { expect(ability).to be_able_to(:create, Comment) }
      it { expect(ability).to be_able_to(:update, comment) }
      it { expect(ability).to be_able_to(:destroy, comment) }
    end

    context 'for attachments' do
      let!(:task) { create(:task, project: create(:project, user: user)) }
      let!(:attachment) { create(:attachment, comment: create(:comment,
        task: task)) }

      it { expect(ability).to be_able_to(:read, attachment) }
      it { expect(ability).to be_able_to(:create, Attachment) }
      it { expect(ability).to be_able_to(:update, attachment) }
      it { expect(ability).to be_able_to(:destroy, attachment) }
    end
  end
end
