// var express = require("express");
// var router = express.Router();
// var passport = require("passport");
// var LocalStrategy = require("passport-local").Strategy;
// var keys = require("../config/key");
// var User = require("../models/user");
// var Posts = require("../models/mpost");
// router.get("/register", function(req, res) {
//   res.render("register");
// });

// router.get("/login", function(req, res) {
//   res.render("login");
// });

// // User Register
// router.post("/register", function(req, res) {
//   var name = req.body.name;
//   var email = req.body.email;
//   var username = req.body.username;
//   var password = req.body.password;
//   var adminCode = req.body.adminCode;
//   var password2 = req.body.password2;
//   req.checkBody("name", "Name is required").notEmpty();
//   req.checkBody("email", "Email is Required").notEmpty();
//   req.checkBody("email", "Email is not valid").isEmail();
//   req.checkBody("username", "user name is required").notEmpty();
//   req.checkBody("password", "password is required").notEmpty();
//   req
//     .checkBody("password2", "passwords do not match")
//     .equals(req.body.password);

//   var errors = req.validationErrors();
//   if (errors) {
//     res.render("register", { errors: errors });
//   } else {
//     var newUser = new User({
//       name: name,
//       email: email,
//       username: username,
//       password: password
//     });
//     if (req.body.adminCode === "sceretcode123") {
//       newUser.isAdmin = true;
//     }
//     // call back for create user in model
//     User.createUser(newUser, function(err, user) {
//       if (err) throw err;
//       console.log(user);
//     });
//     req.flash("success_msg", "You are Register Successfully . and Now login");
//     res.redirect("login");
//     console.log("User Register");
//     res.end();
//   }
// });

// passport.use(
//   new LocalStrategy(function(username, password, done) {
//     User.getUserByUsername(username, function(err, user) {
//       if (err) throw err;
//       if (!user) {
//         return done(null, false, { message: "Unknowm User" });
//       }
//       User.comparePassword(password, user.password, function(err, isMatch) {
//         if (err) throw err;
//         if (isMatch) {
//           keys.username = user.username;
//           return done(null, user);
//         } else {
//           return done(null, false, { message: "Invalid password" });
//         }
//       });
//     });
//   })
// );
// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });
// passport.deserializeUser(function(id, done) {
//   User.getUserById(id, function(err, user) {
//     done(err, user);
//   });
// });
// router.post(
//   "/login",
//   passport.authenticate("local", {
//     successRedirect: "/",
//     failureRedirect: "/users/login",
//     failureFlash: true
//   }),
//   function(req, res) {
//     if ((newUser.isAdmin = true)) {
//       console.log("adminloginnn");
//       res.redirect("/");
//     } else {
//       //res.redirect("users");
//       console.log("user loginnnn");
//       console.log("res  " + res);
//       console.log("req  " + req);
//     }
//   }
// );

// router.get("/logout", function(req, res) {
//   req.logOut();
//   req.flash("success_msg", "you are logged out");
//   res.redirect("/users/login");
//   console.log("logout");
// });

// router.post("/insertnewUser", function(req, res) {
//   var userdata = {
//     name: req.body.name,
//     username: req.body.username,
//     email: req.body.email,
//     password: req.body.password,
//     role: req.body.role
//   };
//   var data = newUser(userdata);
//   data.save();
//   res.redirect("/");
//   console.log("new user add");
// });

// // get all accoount
// router.get("/getuserdata", function(req, res) {
//   User.find().then(function(doc) {
//     res.render("users", { myitems: doc });
//   });
// });

// //Update account
// router.post("/updateuserdata", function(req, res) {
//   var id = req.body.id;

//   User.findById(id, function(err, doc) {
//     if (err) {
//       console.error("error no entry found");
//     }
//     doc.name = req.body.name;
//     doc.username = req.body.username;
//     doc.email = req.body.email;
//     doc.password = req.body.password;
//     doc.role = req.body.role;
//     doc.save();
//   });
//   res.redirect("/users/getuserdata");
// });
// // Delete account
// router.post("/deleteuserdata", function(req, res) {
//   console.log("deleted done");
//   var id = req.body.id;
//   User.findByIdAndRemove(id).exec(); // for execute we use exec
//   res.redirect("/");
// });
// module.exports = router;
