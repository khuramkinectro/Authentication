var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var keys = require("../../config/key");
var User = require("../../models/user");
var Posts = require("../../models/mpost");

module.exports = router;
