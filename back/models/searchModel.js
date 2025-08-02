const mongoose = require("mongoose");

const searchSchema = new mongoose.Schema({
  query: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  verified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },
});

const Search = mongoose.model("Search", searchSchema);

module.exports = Search;
