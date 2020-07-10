//modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const constants = require("./constants/constantsDBLogin_SignUp")
const constantsAPI = require("./constants/APIConstant")
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const STORE = new SessionStore({
  // uri : "mongodb+srv://ahmed:pass@nodejs.6u9jq.gcp.mongodb.net/node",
  uri : constants.URL,
  collection : "sessions"
})
const guards = require("./guards/auth")
const flash = require('connect-flash') // to share data
// routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const signUpRouter = require('./routes/signup');
const APIRouter = require('./routes/API');

const app = express();


app.use(session({
  secret : constantsAPI.SECRET,
  resave: false,
  saveUninitialized : false,
  store : STORE // nel database
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'assets'),
  dest: path.join(__dirname, 'assets'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(flash()); // call it

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', guards.isUser, loginRouter);
app.use('/signup', guards.isUser, signUpRouter);
app.use('/logout', guards.logout);
app.use('/API', APIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
