var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var keys = require("../../config/key");
var User = require("../../models/user");
var Posts = require("../../models/mpost");

router.get("/login", function(req, res) {
  res.render("login");
  console.log("login");
});
router.get("/post", function(req, res) {
  res.redirect("/post");
  res.render("viewAllPost");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/post",
    failureRedirect: "/login",
    failureFlash: true
  }),
  function(req, res) {
    if ((newUser.isAdmin = true)) {
      console.log("adminloginnn");
      //res.redirect("/");
    } else {
      res.redirect("index");
      // res.render("admin");
      res.render("index");

      console.log("user loginnnn");
      console.log("res  " + res);
      console.log("req  " + req);
    }
  }
);
module.exports = router;
