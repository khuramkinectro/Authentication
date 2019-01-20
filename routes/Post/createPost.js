var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var keys = require("../../config/key");
var User = require("../../models/user");
var Posts = require("../../models/mpost");

router.get("/createpost", function(req, res) {
  res.render("createPost");
  console.log("create post");
});

router.get("/postcreated/:id", (req, res) => {
  console.log(req.body);
  Posts.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("createPost", {
        mypost: doc
      });
    }
  });
});

router.post("/postcreated", (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

function insertRecord(req, res) {
  var mypost = new Posts({
    postTitle: req.body.postTitle,
    writepost: req.body.writepost,
    Userid: req.user._id,
    Username: req.user.username
  });

  mypost.save((err, doc) => {
    if (!err) res.redirect("/allPost");
  });
}

function updateRecord(req, res) {
  Posts.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true },
    (err, doc) => {
      if (!err) {
        res.redirect("/allPost");
      }
    }
  );
}
module.exports = router;
