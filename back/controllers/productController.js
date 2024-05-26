const Product = require("../models/productModel");
const expressAsyncHandler = require("express-async-handler");
const Apifeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

const getAllProducts = expressAsyncHandler(async (req, res, next) => {
  let totalProduct = await Product.countDocuments();

  const features = new Apifeatures(Product.find(), req.query).search().filter();

  let product = features.query;
  const resultedProduct = product.length;

  features.pagination(5);
  product = await features.query;

  res.status(200).json({
    success: true,
    resultedProduct,
    totalProduct,
    products: product,
  });
});

const getProduct = expressAsyncHandler(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler("Please provide product id", 400));
  }

  const product = await Product.findById(req.params.id).populate({
    path: "reviews",
    populate: {
      path: "user",
      modal: "User",
    },
  });

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({ success: true, product });
});

const deleteProduct = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.deleteOne({ _id: id, user: req.user._id });

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  res
    .status(200)
    .json({ success: true, product, message: "successful deleted" });
});

const createProduct = expressAsyncHandler(async (req, res, next) => {
  const { name, price, stock, description, category, images } = req.body;
  if (!name || !stock || !price || !description || !category || !image) {
    return next(new ErrorHandler("please fill all required fields", 400));
  }

  const product = await Product.create({
    name,
    price,
    description,
    stock,
    category,
    images: { public_id: "job done", url: "hrllo" },
    user: req.user._id,
  });

  if (!product) {
    res.status(400);
    throw new Error("Inernal Error");
  }

  res.status(201).json({
    success: true,
    product,
  });
});

const updateProduct = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(id, req.body, { new: true });

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

const createProductReview = expressAsyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    return next(new ErrorHandler("please fill all requires fields", 400));
  }

  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  const review = {
    name: req.user.name,
    user: req.user._id,
    rating,
    comment,
  };

  let check = product.reviews.find(
    (item) => item.user.toString() === req.user._id.toString()
  );

  if (!check) {
    product.reviews.push(review);
  } else {
    product.reviews.forEach((item) => {
      if (item.user.toString() === req.user._id.toString())
        (item.rating = rating), (item.comment = comment);
    });
  }

  product.numOfReviews = product.reviews.length;

  let avg = 0;

  product.reviews.forEach((item) => (avg += item.rating));

  product.ratings = avg / product.reviews.length;

  await product.save();

  res.status(201).json({
    success: true,
    product,
  });
});

const getAllReviews = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

const deleteReview = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("product does nor found", 404));
  }

  const review = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.revId.toString()
  );

  product.reviews = review;
  product.numOfReviews = product.reviews.length;

  if (product.numOfReviews === 0) {
    product.ratings = 0;
    await product.save();

    res.status(200).json({
      success: true,
      product,
    });
    return;
  }

  let avg = 0;
  product.reviews.forEach((item) => (avg += item.rating));

  product.ratings = avg / product.reviews.length;

  await product.save();

  res.status(200).json({
    success: true,
    product,
  });
});

const getAdminProducts = expressAsyncHandler(async (req, res, next) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

module.exports = {
  getAllProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  // reviews
  createProductReview,
  getAllReviews,
  deleteReview,
  getAdminProducts,
};
