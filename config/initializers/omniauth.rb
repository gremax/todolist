OmniAuth.config.logger = Rails.logger
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook,
  Rails.application.secrets.facebook_key,
  Rails.application.secrets.facebook_secret,
  scope: 'email', info_fields: 'email',
  callback_url: 'http://todolist-on-rails.herokuapp.com/omniauth/facebook/callback/'
end
