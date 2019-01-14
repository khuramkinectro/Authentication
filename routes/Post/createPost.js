var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var keys = require("../config/key");
var User = require("../models/user");
var Posts = require("../models/mpost");

router.get("/createpost", function(req, res) {
  res.render("createpost");
});
router.post("/createpost", function(req, res) {
  console.log("=====");
  var newpost = new Posts({
    postTitle: req.body.postTitle,
    writepost: req.body.writepost,
    Userid: req.user._id,
    Username: req.user.username
  });
  console.log(newpost);
  console.log("*****");
  console.log(req.user.username);
  newpost.save();
  res.render("viewAllPost");
  //viewAllPost
  res.redirect("/viewAllPost");
});
