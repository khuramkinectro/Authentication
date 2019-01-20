var express = require("express");
var router = express.Router();
var keys = require("../config/key");

//Get HomePage
// router.get("/", ensureAuthenticated, function(req, res) {
//   res.render("index");
// });
// router.get("/allPost", function(req, res) {
//   res.render("allPost");
// });
// function ensureAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     res.redirect("/login");

//     console.log("user", req.user);
//     return next();
//   } else {
//     //req.flash("error_msg", "you are not logged In");
//     res.redirect("/login");
//   }
// }

router.get("/allPost", function(req, res) {
  if (req.isAuthenticated()) {
    if (req.user.isAdmin) {
      keys.isAdmin = true;
      console.log("admin");
      res.render("admin");
    } else {
      console.log("User");
      console.log(req.user);
      keys.isAdmin = false;
      res.render("allPost");
    }
  } else {
    req.flash("error_msg", "you are not logged In");
    res.redirect("/");
  }
});
module.exports = router;
