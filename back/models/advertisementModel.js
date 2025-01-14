const mongoose = require("mongoose");

const advertisementSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: true,
    },
    description: {
      type: String,
    },
    image: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    initialDate: {
      type: Date,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    expireDate: {
      type: Date,
      require: true,
    },
    paymentDetails: {
      type: {
        type: String,
        default: "online",
      },
      price: {
        type: Number,
      },
    },
    paymentRecipt: {
      type: Object,
    },
    createdAt: {
      type: Date,
      default: new Date(Date.now()),
    },
  },
  { timestamps: true }
);

const Advertisement = mongoose.model("Advertisement", advertisementSchema);

module.exports = Advertisement;
