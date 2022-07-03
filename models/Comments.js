const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
//   courseName: String,
  email: String,
  comment: String,
});
commentModel = mongoose.model("commentModel", commentSchema);

module.exports = commentModel;
