var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var keys = require("../../config/key");
var User = require("../../models/user");
var Posts = require("../../models/mpost");
// router.get("/createpost", function(req, res) {
//   res.render("createpost");
// });

router.get("/postGot", function(req, res) {
  Posts.find({ Userid: req.user._id }, function(err, obj) {
    res.render("yourPost", { items: obj });
    //  console.log(obj);
  });
});
module.exports = router;
