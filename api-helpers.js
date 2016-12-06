var mongoose = require('mongoose');
var request = require('request');
var options = require('./config/options.json');
var server = require('./server.js');
var underscoreDeepExtend = require('underscore-deep-extend');
var Schema = mongoose.Schema;

var _ = require('lodash');
_.mixin({deepExtend: underscoreDeepExtend(_)});

var userSchema = new Schema({
  name: { type : String , unique : true, required : true },
  imageUrl: String,
  githubLink: String,
  id: Number,
});

var User = mongoose.model('User', userSchema);

//get all users from teams
[1, 2].forEach(function(page){
  var pageRequests = _.deepExtend(options, {qs: {page: page}});
  request(pageRequests, function (error, response, body) {
    if (error) throw new Error(error);
    console.log(pageRequests);
    var dbData = JSON.parse(body).map(function(element) {
      return new User(
        {
          name: element.login,
          imageUrl: element.avatar_url,
          githubLink: element.html_url,
          id: element.id
        });
      });
      dbData.forEach(function(element){
        element.save(function(err, resolve) {
          if (err) {
            console.log('already exists');
          } else {
            console.log('inserted data into db')
          }
        })
      })
    });
})
