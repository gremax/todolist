OmniAuth.config.logger = Rails.logger
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook,
  Rails.application.secrets.facebook_key,
  Rails.application.secrets.facebook_secret,
  scope: 'email', info_fields: 'email',
  callback_url: 'http://todolist.192.168.1.150.xip.io/omniauth/facebook/callback/'
end
