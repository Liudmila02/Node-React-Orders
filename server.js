const express = require('express');
const redis = require('./src/redis');
var passport = require('passport');
require('./src/passport');
const connectRedis = require('connect-redis');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors')
const routes = require('./src/routes');
const bodyParser = require('body-parser');

const app = express();
app.use(
  cors({
    origin(origin, cb) {
      cb(null, true);
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const sessionMaxAge = 60000 * 60 * 24 * 7;

const sessionConfig = {
    store: new (connectRedis(session))({ client: redis }),
    name: 'sid',
    resave: true,
    saveUninitialized: true,
    secret: "adasdaasdasd",
    unset: 'destroy',
    cookie: {
      httpOnly: true,
      secure: 'auto',
      maxAge: sessionMaxAge,
      domain: "localhost",
    },
  };

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

routes(app);

app.use(express.static(path.join(__dirname, 'build')))
app.get('*', (req, res) => 
// res.status(200).send({
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
  // message: 'Welcome to the clients .',
// })
);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
 console.log(`Node.js API server is listening on http://localhost:${port}/`);
});


// export default app;
module.exports = app;