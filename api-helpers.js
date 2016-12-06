var mongoose = require('mongoose');
var request = require('request');
var options = require('./config/options.json');
var server = require('./server.js');
var underscoreDeepExtend = require('underscore-deep-extend');
var Schema = mongoose.Schema;
var request = require('request');

var _ = require('lodash');
_.mixin({deepExtend: underscoreDeepExtend(_)});

var userSchema = new Schema({
  name: { type : String , unique : true, required : true },
  imageUrl: String,
  githubLink: String,
  id: Number,
});

var userInfoSchema = new Schema({
  name: { type : String , unique : true, required : true },
  fullname: String,
  company: String,
  blog: String,
  location: String,
  email: String,
  hireable: String,
  bio: String,
  publicRepos: Number,
  followers: Number,
  following: Number,
  memberSince: String,
});

var User = mongoose.model('User', userSchema);
var UserInfo = mongoose.model('UserInfo', userInfoSchema);

//get all users from teams, add to db
[1, 2].forEach(function(page){
  var pageRequests = _.deepExtend(options, {qs: {page: page}});
  request(pageRequests, function (error, response, body) {
    if (error) throw new Error(error);
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
            // console.log(element.name);
            // console.log('Member already exists.');
          } else {
            addUserInfo(body, element.name);
            // console.log('Successfully inserted into database.')
          }
        });
      });
    });
});

function addUserInfo(body, name){
  request('http://localhost:8080/user/' + name, function (error, response) {
    if (!error && response.statusCode == 200) {
      var element = JSON.parse(response.body);
      console.log(element);
      var newUserInfo =  new UserInfo({
        name: element.name,
        fullname: element.name,
        company: element.company,
        blog: element.blog,
        location: element.location,
        email: element.email,
        hireable: element.hireable,
        bio: element.bio,
        publicRepos: element.public_repos,
        followers: element.followers,
        following: element.following,
        memberSince: element.created_at,
      });
      newUserInfo.save(function(err, resolve){
        if (err){
          // console.log(err);

          // console.log('User info failed to save or entry already exists');
        } else {
          console.log('Successfully inserted into user info into database.');
        }
      });
    }
  });
}
