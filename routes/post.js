var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var Posts = require("../models/mpost");
var User = require("../models/user");
var keys = require("../config/key");
var request = require("requests");
//
// Create post
//

//
// get all post
//

router.get("/allpost", function(req, res) {
  Posts.find().then(function(doc) {
    res.render("users", { myitems: doc });
  });
});
//
//delete post
//
router.post("/deletePost", function(req, res) {
  id = req.body.id;
  Posts.findOneAndRemove(id).exec(function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log("Delete Post");
    }
  });
  res.render("users");
});

//
// Get all post by one users
//
router.get("/getoneUserPost", function(req, res) {
  Posts.find({ Userid: req.user._id }, function(err, obj) {
    res.render("users", { items: obj });
    console.log(obj);
  });
});

router.post("/updatepost", function(req, res) {
  console.log("route");
  var id = req.body.id;
  Posts.findById(id, function(err, doc) {
    console.log("in function 22");

    if (err) {
      console.log("err , no antry found ");
    }
    doc.postTitle = req.body.postTitle;
    doc.writepost = req.body.writepost;
    doc.save();
    console.log(doc);
    console.log(req.body.postTitle);

    console.log("doc");
    // res.render("users");
  });
});
module.exports = router;
