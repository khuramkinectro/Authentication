var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parse");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var expressValidator = require("express-validator");
var flash = require("connect-flash");
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongo = require("mongodb");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/loginapp");
var db = mongoose.connection;

//var routes = require();
var admin = require("./routes/admin");

var routes = require("./routes/index");
//var users = require("./routes/users");
var posts = require("./routes/post");
var register = require("./routes/Authentication/register");
var login = require("./routes/Authentication/login");
var logout = require("./routes/Authentication/logout");
//Initialize You app
var app = express(); //1

//view engine
app.set("views", path.join(__dirname, "views")); // 2
app.engine("handlebars", exphbs({ defaultLayout: "layout" }));
app.set("view engine", "handlebars");

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

// static folder like jquery image stylesheet these file
// publicy accessaible to browser
app.use(express.static(path.join(__dirname, "public")));

// middleware for express session
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);
// passport intilization
app.use(passport.initialize());
app.use(passport.session());

//express validator
app.use(
  expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split("."),
        root = namespace.shift(),
        formParam = root;
      while (namespace.length) {
        formParam += "[" + namespace.shift() + "]";
      }
      return {
        param: formParam,
        msg: msg,
        value: value
      };
    }
  })
);
//connect flash
app.use(flash());
//global variables for flash msg
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  res.locals.admin = req.admin || null;
  res.locals.posts = req.postby || null;
  // console.log("req.admin  " + req.user);
  // console.log("res.locals.admin  " + res.locals.user);

  // passport set his own flash msg we set to error veriable
  next();
});

app.use("/", routes);
//app.use("/users", users);
app.use("/", admin);
app.use("/post", posts);
app.use("/", register);
app.use("/", login);
app.use("/", logout);
// for admin
//app.use("/admin", users);

//set port
app.set("port", process.env.PORT || 8000);
app.listen(app.get("port"), function() {
  console.log("server started on port" + app.get("port"));
});
