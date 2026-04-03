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
    user.cart.push({ productId, quantity });
    await user.save();
  } else {
    user.cart[index].quantity = quantity;
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

const getAllCart = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("cart");

  if (user.cart.length == 0) {
    return next(new ErrorHandler("Cart is empty!!", 404));
  }

  res.status(200).json({
    success: true,
    cart: user.cart,
  });
});

module.exports = { addToCartController, removeFromCart, getAllCart };
