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

const getFavourites = expressAsyncHandler(async (req, res, next) => {
  const favourites = await View.find({
    status: "favourite",
    user: req.user._id,
  }).populate("product");

  res.status(200).json({
    success: true,
    favourites,
  });
});

const createFavourite = expressAsyncHandler(async (req, res, next) => {
  const { product } = req.body;
  const view = await View.findOne({ product, user: req.user._id }).populate(
    "product"
  );
  if (view) {
    view.status = "favourite";
    await view.save();
    return res.status(200).json({
      success: true,
      view,
    });
  } else {
    const favourite = await View.create({
      product,
      user: req.user._id,
      status: "favourite",
    }).populate("product");

    return res.status(201).json({
      success: true,
      favourite,
    });
  }
});
const removeFavourite = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const view = await View.findOneAndUpdate(
    { product: id, user: req.user._id },
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
  getFavourites,
  createFavourite,
  removeFavourite,
};
