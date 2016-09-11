import oauthConfig from 'server/configs/passport/oauth'

import passportFacebook from 'passport-facebook'
const FacebookStrategy = passportFacebook.Strategy

module.exports = function passportGetConfigs(passport) {
  passport.use(new FacebookStrategy({
    clientID: oauthConfig.facebook.clientID,
    clientSecret: oauthConfig.facebook.clientSecret ,
    callbackURL: oauthConfig.facebook.callbackURL,
    profileFields: ['id', 'emails', 'name']
  },
  function(accessToken, refreshToken, profile, done) {
    const user = profile._json
    return done(null, user)
  }));
};
