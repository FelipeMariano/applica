var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var cardenetas = require('./routes/cardenetas');
var aplicacoes = require('./routes/aplicacoes');
var vacinas = require('./routes/vacinas');

var auth = require('./routes/authenticate');
var jwt = require('jsonwebtoken');
var config = require('./config');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('secretToken', config.secretToken);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/authenticate', auth);
app.use('/api', routes);
app.use('/api/users', users);
app.use('/api/cardenetas', cardenetas);
app.use('/api/aplicacoes', aplicacoes);
app.use('/api/vacinas', vacinas);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


//////// Mongodb ftw

var mongoose = require('mongoose')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/applica')
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));




module.exports = app;
