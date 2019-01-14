var express = require("express");
var router = express.Router();

//Get HomePage
router.get("/", ensureAuthenticated, function(req, res) {
  res.render("index");
});
router.get("/post", function(req, res) {
  res.render("viewAllPost");
});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect("/login");

    console.log("user", req.user);
    return next();
  } else {
    //req.flash("error_msg", "you are not logged In");
    res.redirect("/login");
  }
}

//

//

//

// router.get("/", function(req, res) {
//   // if (req.isAuthenticated()) {
//   //   if (req.user.isAdmin) {
//   //     res.render("admin");
//   //   } else {
//   //     res.render("users");
//   //   }
//   // } else {
//   //   req.flash("error_msg", "you are not logged In");
//   // res.redirect("/");
// });
module.exports = router;
