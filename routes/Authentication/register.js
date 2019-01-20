var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var keys = require("../../config/key");
var User = require("../../models/user");
var Posts = require("../../models/mpost");

router.get("/register", function(req, res) {
  res.render("register");
  console.log("register");
});

router.post("/register", function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var adminCode = req.body.adminCode;
  var password2 = req.body.password2;
  req.checkBody("name", "Name is required").notEmpty();
  req.checkBody("email", "Email is Required").notEmpty();
  req.checkBody("email", "Email is not valid").isEmail();
  req.checkBody("username", "user name is required").notEmpty();
  req.checkBody("password", "password is required").notEmpty();
  req
    .checkBody("password2", "passwords do not match")
    .equals(req.body.password);

  var errors = req.validationErrors();
  if (errors) {
    res.render("register", { errors: errors });
  } else {
    var newUser = new User({
      name: name,
      email: email,
      username: username,
      password: password
    });
    if (req.body.adminCode === "sceretcode123") {
      newUser.isAdmin = true;
    } else {
      newUser.isAdmin = false;
    }
    // call back for create user in model
    User.createUser(newUser, function(err, user) {
      if (err) throw err;
      console.log(user);
    });
    req.flash("success_msg", "You are Register Successfully . and Now login");
    res.redirect("login");
    console.log("User Register");
    res.end();
  }
});

passport.use(
  new LocalStrategy(function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, { message: "Unknowm User" });
      }
      User.comparePassword(password, user.password, function(err, isMatch) {
        if (err) throw err;
        if (isMatch) {
          keys.username = user.username;
          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid password" });
        }
      });
    });
  })
);
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});
module.exports = router;
