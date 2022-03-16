var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var toastr = require('express-toastr');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors')
const connectToDb = require('./db/connect');
var flash = require('connect-flash');
var app = express();
var session = require('express-session');
var layout = require('express-layout');

connectToDb();

app.use(layout());
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.json());
app.use(cookieParser());
app.use(flash());
app.use(toastr());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, "views"));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('layouts', './views/layouts');
app.set('layout', 'admin');

/********************************/
require('./app/routes/user.js')(app);
require('./app/routes/category.js')(app);
require('./app/routes/vendor.js')(app);
require('./app/routes/web.js')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// const a = require('./app/helpers/helper').auth
// a()
// .then((a)=>{
//   console.log('@@@@@@@@@@@@@@@@@@@@@', a);
//   app.locals.abc=a})
// .catch((err)=>{console.log(err)})

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
