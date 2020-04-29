var { localStrategy } = require('passport-local').Strategy;
const { login } = require('./controllers/user');
const passport = require('passport');
passport.use('localSignin', new localStrategy({
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
export default PassportLocal;