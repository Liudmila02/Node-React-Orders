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
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://trusting-brahmagupta-ae8b41.netlify.app/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.header("Access-Control-Allow-Credentials", 'true'); 
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});
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

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the clients .',
}));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
 console.log(`Node.js API server is listening on http://localhost:${port}/`);
});


// export default app;
module.exports = app;