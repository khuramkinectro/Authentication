var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  postTitle: { type: String, required: true },
  writepost: { type: String, required: true },
  Userid: { type: Schema.Types.ObjectId, ref: "User" },
  Username: { type: String }
});
module.exports = mongoose.model("AllPost", PostSchema);
//console.log("idddddd" + Schema.Types.ObjectId);
