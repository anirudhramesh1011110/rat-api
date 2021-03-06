const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/index');
const android_routes = require('./routes/android');

const app = express();
const mongodb_uri = process.env.MONGODB_URI;

const Master = require('./models/master');


// Test Master

// var master = new Master({
//   username: 'testMaster',
//   password: 'gchq9er1'
// });
//
// master.save((err) => {
//
//   if(err) throw err;
//
//   Master.findOne({username: 'testMaster'}, (err, master) => {
//
//     if(err) throw err;
//     console.log(master.validPassword('gchq9er1'));
//   });
//
// });


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.use('/', routes);
app.use('/', android_routes);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handlers


// Database Connection
mongoose.connect(mongodb_uri);

// Development error handler
// Will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// Production error handler
// No stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
