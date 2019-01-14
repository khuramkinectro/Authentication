var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var keys = require("../../config/key");
var User = require("../../models/user");
var Posts = require("../../models/mpost");

router.get("/logout", function(req, res) {
  req.logOut();
  req.flash("success_msg", "you are logged out");
  res.redirect("/login");
  console.log("logout");
});
module.exports = router;
