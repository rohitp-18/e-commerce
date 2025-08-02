const expressAsyncHandler = require("express-async-handler");
const Search = require("../models/searchModel");
const ErrorHandler = require("../utils/errorHandler");

const createSearch = expressAsyncHandler(async (req, res) => {
  const { query } = req.body;
  const search = await Search.create({ query, user: req.user._id });
  res.status(201).json({
    success: true,
    message: "Search created successfully",
    search,
  });
});

const createAdminSearch = expressAsyncHandler(async (req, res) => {
  const { query } = req.body;
  const search = await Search.create({
    query,
    user: req.user._id,
    verified: true,
  });
  res.status(201).json({
    success: true,
    message: "Admin search created successfully",
    search,
  });
});

const getSearches = expressAsyncHandler(async (req, res) => {
  const { query } = req.query;
  const { user } = req;
  if (query) {
    let searches = [];
    user &&
      (searches = await Search.find({
        query: { $regex: query, $options: "i" },
        user: user._id,
        isDeleted: false,
      }).sort({ createdAt: -1 }));

    const verifiedSearches = await Search.find({
      query: { $regex: query, $options: "i" },
      verified: true,
      isDeleted: false,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      searches: [...searches, ...verifiedSearches],
    });
  }

  const searches = await Search.find({
    user: req.user._id,
    isDeleted: false,
  }).sort({
    createdAt: -1,
  });
  res.status(200).json({
    success: true,
    searches,
  });
});

const deleteSearch = expressAsyncHandler(async (req, res, next) => {
  const search = await Search.findById(req.params.id);
  if (!search || search.isDeleted) {
    return next(new ErrorHandler("Search not found", 404));
  }
  if (search.user.toString() !== req.user._id.toString()) {
    return next(
      new ErrorHandler("You are not authorized to delete this search", 403)
    );
  }
  await search.remove();
  res
    .status(204)
    .json({ success: true, message: "Search deleted successfully" });
});

const adminDeleteSearch = expressAsyncHandler(async (req, res, next) => {
  const search = await Search.findById(req.params.id);
  if (!search || search.isDeleted) {
    return next(new ErrorHandler("Search not found", 404));
  }
  await search.remove();
  res.status(204).json({
    success: true,
    message: "Search deleted successfully",
  });
});

const getAdminSearch = expressAsyncHandler(async (req, res) => {
  const { query } = req.query;

  const searches = await Search.find({
    query: { $regex: query ? query : "", $options: "i" },
    isDeleted: false,
  }).sort({ createdAt: -1 });

  if (!searches || searches.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No searches found",
    });
  }
  res.status(200).json({
    success: true,
    searches,
  });
});

const updateSearch = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { query, verified } = req.body;

  const search = await Search.findById(id);
  if (!search) {
    return res.status(404).json({
      success: false,
      message: "Search not found",
    });
  }

  search.query = query;
  search.verified = verified;
  await search.save();

  res.status(200).json({
    success: true,
    message: "Search updated successfully",
    search,
  });
});

module.exports = {
  createSearch,
  createAdminSearch,
  getSearches,
  updateSearch,
  deleteSearch,
  adminDeleteSearch,
  getAdminSearch,
};
