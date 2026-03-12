const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");

const addToCartController = expressAsyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return next(new ErrorHandler("Please provide all fields", 400));
  }

  const user = await User.findById(req.user._id);

  let index = user.cart.findIndex({ productId });

  if (index == -1) {
    user.cart.push({ productId });
    await user.save();
  }

  res.status(200).json({
    success: true,
    message: "Product added to cart successfully",
  });
});

const removeFromCart = expressAsyncHandler(async (req, res, next) => {
  const { id: productId } = req.params;

  if (!productId) {
    return next(new ErrorHandler("Invalid Product id", 400));
  }

  const user = await User.findById(req.user._id);

  user.cart = user.cart.filter((product) => product !== productId);
  await user.save();

  res.status(200).json({
    success: true,
    message: "Product removed from cart successfully",
  });
});

module.exports = { addToCartController, removeFromCart };
