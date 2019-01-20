var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var keys = require("../../config/key");
var User = require("../../models/user");
var Posts = require("../../models/mpost");

// router.get("/createpost", function(req, res) {
//   res.render("createpost");
//   res.redirect("/createpost");
// });

router.get("/getYourPosts", function(req, res) {
  res.render("yourPost");
  console.log("yourpost");
});

router.get("/getPosts", function(req, res) {
  Posts.find().then(function(doc) {
    console.log("fun click ho gya");

    res.render("allpost", { myitems: doc });
  });
});

router.get("/adminGetAllPosts", function(req, res) {
  Posts.find().then(function(doc) {
    console.log("fun click ho gyaaaaaaaaaaaaaaaaa");
    res.render("admin", { adminGetsPosts: doc });
  });
});

module.exports = router;
