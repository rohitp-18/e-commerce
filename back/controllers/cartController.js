const expressAsyncHandler = require("express-async-handler");
const ErrorHandler = require("../utils/errorHandler");
const Cart = require("../models/cartModel");

const addToCartController = expressAsyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return next(new ErrorHandler("Please provide all fields", 400));
  }

  let cartItem = await Cart.findOne({ userId: req.user._id, productId });

  if (cartItem) {
    cartItem.quantity = quantity;

    await cartItem.save();
  } else {
    cartItem = await Cart.create({
      userId: req.user._id,
      productId,
      quantity,
    });
  }

  res.status(200).json({
    success: true,
    message: "Product added to cart successfully",
    cart: cartItem,
  });
});

const removeFromCart = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const cartItem = await Cart.findByIdAndDelete(id);

  if (!cartItem.id) {
    return next(new ErrorHandler("Product does not found in cart", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product removed from cart successfully",
  });
});

const getAllCart = expressAsyncHandler(async (req, res, next) => {
  const cartItems = await Cart.find({ userId: req.user._id }).populate(
    "productId",
    "images name price stock",
  );

  res.status(200).json({
    success: true,
    cart: cartItems,
  });
});

const updateCartItem = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const cartItem = await Cart.findByIdAndUpdate(id, { quantity });

  if (!cartItem) {
    return next(new ErrorHandler("Product does not found in cart", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product removed from cart successfully",
  });
});

module.exports = {
  addToCartController,
  removeFromCart,
  getAllCart,
  updateCartItem,
};
