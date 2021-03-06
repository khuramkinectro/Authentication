var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require("mongoose-unique-validator");
//User Schema
var UserSchema = new Schema({
  username: {
    // define usernam unique
    type: String,
    require: true,
    unique: true
  },
  password: {
    type: String,
    require: true
  },
  email: {
    type: String,
    require: true,
    unique: true
  },
  name: {
    type: String
  },
  isAdmin: { type: Boolean, default: false },
  role: { type: String, default: "" },
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "AllPost" }]
});
UserSchema.plugin(mongooseUniqueValidator);
// we create ver User for access these out fo this file //User is model name (1st parameter)
var User = (module.exports = mongoose.model("User", UserSchema));
// all User related function down here

module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(newUser.password, salt, function(err, hash) {
      // Store hash in your password DB.
      newUser.password = hash;
      //console.log(salt);
      //console.log(hash);
      newUser.save(callback);
    });
  });
};
module.exports.getUserByUsername = function(username, callback) {
  var query = { username: username };
  User.findOne(query, callback);
};
module.exports.getUserById = function(id, callback) {
  User.findById(id, callback); // mongoose methood
};

module.exports.comparePassword = function(canidatePassword, hash, callback) {
  bcrypt.compare(canidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
};
