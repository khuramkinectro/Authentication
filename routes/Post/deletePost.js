var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var keys = require("../../config/key");
var User = require("../../models/user");
var Posts = require("../../models/mpost");

router.post("/deletePost/:id", function(req, res) {
  //id = req.body.id;
  //  console.log(idForDelete);
  Posts.findById(req.params.id)
    .remove()
    .exec(function(err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log("Delete Post Done");
      }
    });
  res.render("yourPost");
});
module.exports = router;
