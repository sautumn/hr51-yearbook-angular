var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var options = require('./config/user-options.json');
var request = require('request');

var User = require('./api-helpers.js');
var UserInfo = require('./api-helpers.js');

var underscoreDeepExtend = require('underscore-deep-extend');
var _ = require('lodash');
_.mixin({deepExtend: underscoreDeepExtend(_)});

var app = express();

mongoose.connect('mongodb://localhost:27017/users');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/json' }));



app.get('/', function(req, res) {
  res.send('index.html');
});

app.get('/allusers', function(req, res) {
  UserInfo.find(function(error, users) {
    if (error) {
      res.send(error);
    } else {
      res.send(JSON.stringify(users));
    }
  });
});

//request to fire out get to GitHub user profile
app.get('/user/:username', function(req, res) {
  //get user name and extend headers to add at time of request
  var userOptions = _.deepExtend(options, {url: "https://api.github.com/users/" + req.params.username});
  request(userOptions, function (error, response, body) {
    if (error) throw new Error(error);
    res.send(body);
  });
});

app.listen(8080);
console.log("App listening on port 8000");
