const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      default: 1,
    },
    updatedAt: {},
    createdAt: {
      type: Date,
      default: new Date(Date.now()),
    },
  },
  { timestamps: true },
);

cartSchema.pre("save", function () {
  this.updatedAt = new Date(Date.now());
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
