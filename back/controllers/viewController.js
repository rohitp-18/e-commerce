const expressAsyncHandler = require("express-async-handler");
const View = require("../models/viewsModel");

const getAllViews = expressAsyncHandler(async (req, res, next) => {
  const views = await View.find({}).populate("product").populate("user");
  res.status(200).json({
    success: true,
    views,
  });
});

const getViews = expressAsyncHandler(async (req, res, next) => {
  const views = await View.find({ user: req.user._id }).populate("product");
  res.status(200).json({
    success: true,
    views,
  });
});

const createView = expressAsyncHandler(async (req, res, next) => {
  const { product } = req.body;
  const viewExist = await View.findOne({ product, user: req.user._id });
  if (viewExist) {
    viewExist.createdAt = Date.now();
    await viewExist.save();
    return res.status(200).json({
      success: true,
      view: viewExist,
    });
  }
  const view = await View.create({ product, user: req.user._id });
  res.status(201).json({
    success: true,
    view,
  });
});

const updateView = expressAsyncHandler(async (req, res, next) => {
  const { product, status } = req.body;
  const view = await View.findOneAndUpdate(
    { product, user: req.user._id },
    { status },
    { new: true }
  );
  res.status(200).json({
    success: true,
    view,
  });
});

const removeView = expressAsyncHandler(async (req, res, next) => {
  const { product } = req.body;
  const view = await View.findOneAndDelete({ product, user: req.user._id });
  res.status(200).json({
    success: true,
    view,
  });
});

const getFavorites = expressAsyncHandler(async (req, res, next) => {
  const favorites = await View.find({
    status: "favorite",
    user: req.user._id,
  }).populate("product");

  res.status(200).json({
    success: true,
    favorites,
  });
});

const createFavorite = expressAsyncHandler(async (req, res, next) => {
  const { product } = req.body;
  const view = await View.findOne({ product, user: req.user._id });
  if (view) {
    view.status = "favorite";
    await view.save();
    return res.status(200).json({
      success: true,
      view,
    });
  } else {
    const favorite = await View.create({
      product,
      user: req.user._id,
      status: "favorite",
    });
    return res.status(201).json({
      success: true,
      favorite,
    });
  }
});
const removeFavorite = expressAsyncHandler(async (req, res, next) => {
  const { product } = req.body;
  const view = await View.findOneAndUpdate(
    { product, user: req.user._id },
    { status: "view" }
  );
  res.status(200).json({
    success: true,
    view,
  });
});

module.exports = {
  getAllViews,
  getViews, // for get userd views
  createView,
  updateView,
  removeView,

  // fovorite actions
  getFavorites,
  createFavorite,
  removeFavorite,
};
