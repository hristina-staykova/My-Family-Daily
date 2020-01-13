var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var user = require("../models/user.js");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email"
    },
    function(username, password, done) {
      user.selectUserByEmail(username, function(result) {
        if (result == undefined || result.user_password !== password) {
          return done(null, false, {
            message: "Incorrect username or password."
          });
        }
        return done(null, result.email);
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
