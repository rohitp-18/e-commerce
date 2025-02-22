const mongoose = require("mongoose");

const viewSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "Product",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    status: {
      type: String,
      default: "view",
    },
    createdAt: {
      type: Date,
      default: new Date(Date.now()),
    },
  },
  { timestamps: true }
);

const View = mongoose.model("View", viewSchema);

module.exports = View;
