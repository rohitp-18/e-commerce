const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const Cart = require("../models/cartModel");

const addToCartController = expressAsyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return next(new ErrorHandler("Please provide all fields", 400));
  }

  const cartItem = await Cart.findOne({ user: req.user._id, productId });

  if (cartItem) {
    cartItem.quantity = quantity;
  } else {
    await Cart.create({
      userId: req.user._id,
      productId,
      quantity,
    });
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

  const cartItem = await Cart.findOneAndDelete({
    userId: req.user._id,
    productId,
  });

  if (!cartItem.id) {
    return next(new ErrorHandler("Product does not found in cart", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product removed from cart successfully",
  });
});

const getAllCart = expressAsyncHandler(async (req, res, next) => {
  const cartItems = await Cart.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    cart: cartItems,
  });
});

module.exports = { addToCartController, removeFromCart, getAllCart };
