var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var todos = require('./routes/todos');
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/api/v1/', todos);

app.use(function(req, res, next) {
var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var server = app.listen(3000, function() {
    console.log('App Running!!!');
});
module.exports = app;
