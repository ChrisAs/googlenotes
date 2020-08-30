const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const config = require('./configuration/index');
const User = require('./models/user');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
};
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: config.jwtSecret,
      passReqToCallback: true,
    },
    async (req, payload, done) => {
      try {
        const user = await User.findById(payload.sub);
        if (!user) {
          return done(null, false);
        }
        req.user = user;
        done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

passport.use(
  'google',
  new GoogleStrategy(
    {
      clientID: config.web.client_id,
      clientSecret: config.web.client_secret,
      callbackURL: config.web.redirect_uris,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const currentUser = await User.findOne({ googleId: profile.id });
        if (currentUser) {
          return done(null, currentUser, { statusCode: 200 });
        }
        const email = profile.emails[0].value;
        const userName = profile.emails[0].value;
        const userObj = new User({
          googleId: profile.id,
          userName,
          email,
        });
        const user = await userObj.save({ validateBeforeSave: false });
        return done(null, user, { statusCode: 201 });
      } catch (err) {
        done(err, false);
      }
    }
  )
);
