var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  postTitle: { type: String },
  writepost: { type: String },
  Userid: { type: Schema.Types.ObjectId, ref: "User" },
  Username: { type: String }
});
module.exports = mongoose.model("AllPost", PostSchema);
//console.log("idddddd" + Schema.Types.ObjectId);
