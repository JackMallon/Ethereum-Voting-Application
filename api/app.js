var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Web3 = require('web3');
var contract = require("truffle-contract");
var path = require('path');
var MyContractJSON = require(path.join(__dirname, '../build/contracts/Election.json'));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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

var provider    = new Web3.providers.HttpProvider("http://127.0.0.1:7545");
var MyContract = contract(MyContractJSON);
MyContract.setProvider(provider);

MyContract.deployed().then(function(i) { 
  app=i; 
  app.candidates(1).then(function(c) { 
    candidate = c; 
    console.log(candidate.name);
  })
})

module.exports = app;