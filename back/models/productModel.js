const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: ["true", "Name is required"],
    },
    description: {
      type: String,
      required: ["true", "Discription is required"],
    },
    price: {
      type: Number,
      required: ["true", "Price is required"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: ["true", "Public id"],
        },
        url: {
          type: String,
          required: ["true", "Url is required"],
        },
      },
    ],
    category: {
      type: String,
      required: ["true", "Category is required"],
    },
    stock: {
      type: Number,
      requied: ["true", "stock should be is required"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        name: {
          type: String,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          default: 0,
        },
        comment: {
          type: String,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: ["true", "User is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
