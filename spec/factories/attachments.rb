FactoryGirl.define do
  factory :attachment do
    file { Rack::Test::UploadedFile.new("#{Rails.root}/spec/support/uploads/rg_test_task_grid.png", 'image/png') }
    comment
  end

end
