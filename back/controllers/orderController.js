const Order = require("../models/orderModel");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");

const createOrder = expressAsyncHandler(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
    paidAt: Date.now(),
  });

  res.status(201).json({
    success: true,
    order,
  });
});

const getSingleOrder = expressAsyncHandler(async (req, res, next) => {
  const order = await Order.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).populate("user", "name email");

  if (!order) {
    return next(new ErrorHandler("order not found", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

const myOrder = expressAsyncHandler(async (req, res, next) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});

// admin route
// admin get all order
const getAllOrder = expressAsyncHandler(async (req, res, next) => {
  const orders = await Order.find();

  res.status(200).json({ success: true, orders });
});

// admin route
// admin update status order
const updateOrder = expressAsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("order not found", 404));
  }

  if (order.orderStatus === "Delivered") {
    return next(new ErrorHandler("Order has been already delivered", 400));
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }

  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliverdAt = new Date();
  }

  await order.save();
  res.status(200).json({ success: true, order });
});

const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);

  product.stock -= quantity;

  await product.save();
};

const adminDeleteOrder = expressAsyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: true, order });
});

const adminSingleOrder = expressAsyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );
  res.status(200).json({
    success: true,
    order,
  });
});

module.exports = {
  createOrder,
  getSingleOrder,
  myOrder,
  //admin
  adminDeleteOrder,
  getAllOrder,
  updateOrder,
  adminSingleOrder,
};
