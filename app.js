//modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const session = require('express-session');
const SessionStore = require('connect-mongodb-session')(session);
const STORE = new SessionStore({
  // uri : "mongodb+srv://ahmed:pass@nodejs.6u9jq.gcp.mongodb.net/node",
  uri : "mongodb://localhost:27017/first-project",
  collection : "sessions"
})
const guards = require("./guards/auth")

// routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const signUpRouter = require('./routes/signup');

const app = express();


app.use(session({
  secret : "ae631cea49c278b087fb848da055bea3aad1445decdceae684d19157e57bddbaaf54aeacda97fbe0717fe2dc36728695c3f329f54e6272834d66b604616ad379",
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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', guards.isUser, loginRouter);
app.use('/signup', guards.isUser, signUpRouter);

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
