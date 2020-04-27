const passport = require('passport');
const PassportLocal = require('./local');
var { localStrategy } = require('passport-local').Strategy;
const { login } = require('./controllers/user');

passport.serializeUser((user, done) => {
  done(null, {
    id: user.id,
    name: user.name,
    email: user.email
  });
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
// passport.use('local', PassportLocal);
passport.use(new localStrategy({
  usernameField: 'email',
  passwordField: 'password',
},
async (email, password, done) => {
  if (!email || !password) {
    return done(null, false, { message: 'Invalid data format.' });
  }
  try {
    const user = await login({ email, password });
    return done(null, user);
  } catch (err) {
    let message = err.message || 'An error occurred. Please try again later.';
    return done(null, false, { message });
  }
}
));

// export default passport;
