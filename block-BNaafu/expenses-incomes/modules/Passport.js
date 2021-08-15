var passport = require('passport');
var User = require('../models/User')

// GitHubStrategy 

var GitHubStrategy = require('passport-github').Strategy;

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(profile)
      var profileData = {
        name : profile.displayName,
        username : profile.username,
        email : profile._json.email,
        photo : profile._json.avatar_url,
      }
    // User.findOrCreate({ githubId: profile.id }, function (err, user) {
    //   return cb(err, user);
    // });
      User.findOne({email : profile._json.email}, (err,user) => {
          if(err) return cb(err);
          if(!user){
              User.create(profileData, (err,adduser) => {
                  if(err) return next(err);
                  return cb(null, adduser)
              })
          }else{
              console.log(user)
              cb(null,user)
          }
      })
  }
));


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });


  passport.deserializeUser(function(id, done) {
    User.findById(id,"name email username photo", function(err, user) {
      done(err, user);
    });
  });