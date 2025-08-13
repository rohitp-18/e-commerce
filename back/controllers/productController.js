const Product = require("../models/productModel");
const expressAsyncHandler = require("express-async-handler");
const Apifeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const View = require("../models/viewsModel");
const cloudinary = require("cloudinary").v2;

const getHomePage = expressAsyncHandler(async (req, res, next) => {
  const products = await Product.find().limit(10);
  const newProducts = await Product.find().sort({ createdAt: -1 }).limit(10);
  const featuredProducts = await Product.find({ ratings: { $gte: 4 } }).limit(
    10
  );
  const topRatedProducts = await Product.find().sort({ ratings: -1 }).limit(10);
  const sponsored = await Product.find({ sponsored: true }).limit(10);

  if (!req.user) {
    return next(
      res.status(200).json({
        success: true,
        products,
        newProducts,
        featuredProducts,
        topRatedProducts,
        sponsored,
      })
    );
  }

  const views = await View.find({ user: req.user._id })
    .populate("product")
    .sort({ createdAt: -1 })
    .limit(10);
  const favorites = await View.find({ user: req.user._id, status: "favorite" })
    .populate("product")
    .sort({ createdAt: -1 })
    .limit(10);

  // const recommended = await View.find({ user: req.user._id, status: "view" }).populate("product").sort({ createdAt: -1 }).limit(10);

  res.status(200).json({
    success: true,
    products,
    newProducts,
    featuredProducts,
    topRatedProducts,
    sponsored,
    views,
    favorites,
    // recommended,
  });
});

const getProductCategory = expressAsyncHandler(async (req, res, next) => {
  const { category } = req.params;

  const products = await Product.find({ category }).limit(10);
  const newProducts = await Product.find().sort({ createdAt: -1 }).limit(10);
  const featuredProducts = await Product.find({ ratings: { $gte: 4 } }).limit(
    10
  );
  const topRatedProducts = await Product.find().sort({ ratings: -1 }).limit(10);
  const sponsored = await Product.find({ sponsored: true }).limit(10);

  if (!req.user) {
    return next(
      res.status(200).json({
        success: true,
        products,
        newProducts,
        featuredProducts,
        topRatedProducts,
        sponsored,
      })
    );
  }

  const views = await View.find({ user: req.user._id })
    .populate("product")
    .sort({ createdAt: -1 })
    .limit(10);
  const favorites = await View.find({ user: req.user._id, status: "favorite" })
    .populate("product")
    .sort({ createdAt: -1 })
    .limit(10);

  // const recommended = await View.find({ user: req.user._id, status: "view" }).populate("product").sort({ createdAt: -1 }).limit(10);

  res.status(200).json({
    success: true,
    products,
    newProducts,
    featuredProducts,
    topRatedProducts,
    sponsored,
    views,
    favorites,
    // recommended,
  });
});

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

  const simmilar = await Product.find({ category: product.category });
  const recommended = await Product.find({
    category: product.category,
    ratings: { $gte: 4 },
  });
  const topRatedProducts = await Product.find({ category: product.category })
    .sort({ ratings: -1 })
    .limit(10);
  const sponsored = await Product.find({
    category: product.category,
    sponsored: true,
  }).limit(10);

  res.status(200).json({
    success: true,
    product,
    simmilar,
    recommended,
    topRatedProducts,
    sponsored,
  });
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
  const { name, price, stock, description, category } = req.body;
  if (!name || !stock || !price || !description || !category) {
    return next(new ErrorHandler("please fill all required fields", 400));
  }

  if (!req.files || req.files.length === 0) {
    return next(new ErrorHandler("please upload image", 400));
  }

  let avatar = [];

  try {
    await Promise.all(
      req.files.map(async (image, i) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const data = await cloudinary.uploader.upload(dataURI, {
          folder: `e-comerce/${category}/${name}`,
          height: 200,
          crop: "pad",
        });

        avatar[i] = {
          public_id: data.public_id,
          url: data.secure_url,
        };
      })
    );
  } catch (error) {
    return next(new ErrorHandler("internal Error", 500));
  }

  const product = await Product.create({
    name,
    price,
    description,
    stock,
    category,
    images: avatar,
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
  const { name, price, stock, description, category } = req.body;

  let info = {
    name,
    price,
    stock,
    description,
    category,
    images: [],
  };

  if (!name || !price || !stock || !description || !category) {
    return next(new ErrorHandler("please fill all required fields", 400));
  }

  if (req.body.image && req.body.image[0]) {
    info.images = [...req.body.image];
  }

  if (req.files) {
    try {
      await Promise.all(
        req.files.map(async (image, i) => {
          const b64 = Buffer.from(image.buffer).toString("base64");
          let dataURI = "data:" + image.mimetype + ";base64," + b64;
          const data = await cloudinary.uploader.upload(dataURI, {
            folder: `commerce/project/${name}`,
            height: 200,
            crop: "pad",
          });

          info.images[i + req.body.image?.length || 0] = {
            public_id: data.public_id,
            url: data.secure_url,
          };
        })
      );
    } catch (error) {
      return next(new ErrorHandler("internal Error", 500));
    }
  }

  if (info.images.length <= 0) {
    return next(new ErrorHandler("please upload image", 400));
  }

  const product = await Product.findByIdAndUpdate(id, info, { new: true });

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

const getSellerProducts = expressAsyncHandler(async (req, res, next) => {
  const products = await Product.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    products,
  });
});

const updateSellerProduct = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const tempProduct = await Product.findOne({ _id: id, user: req.user._id });

  if (!tempProduct) {
    return next(new ErrorHandler("product not found", 404));
  }

  let info = {
    name: req.body.name,
    price: req.body.price,
    stock: req.body.stock,
    description: req.body.description,
    category: req.body.category,
    images: [],
  };

  if (
    !info.name ||
    !info.price ||
    !info.stock ||
    !info.description ||
    !info.category
  ) {
    return next(new ErrorHandler("please fill all required fields", 400));
  }

  if (req.body.image) {
    info.images = [...req.body.image];
  }

  if (req.files) {
    console.log(req.files);
    try {
      await Promise.all(
        req.files.map(async (image, i) => {
          const b64 = Buffer.from(image.buffer).toString("base64");
          let dataURI = "data:" + image.mimetype + ";base64," + b64;
          const data = await cloudinary.uploader.upload(dataURI, {
            folder: `commerce/project/${name}`,
            height: 200,
            crop: "pad",
          });

          info.images[i + info.images.length] = {
            public_id: data.public_id,
            url: data.secure_url,
          };
        })
      );
    } catch (error) {
      return next(new ErrorHandler("internal Error", 500));
    }
  }

  const product = await Product.findByIdAndUpdate(
    { id, user: req.user._id },
    info,
    { new: true }
  );

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});

const deleteSellerProduct = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.deleteOne({ _id: id, user: req.user._id });

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  res
    .status(200)
    .json({ success: true, product, message: "successful deleted" });
});

const reviewSellerProduct = expressAsyncHandler(async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

module.exports = {
  getHomePage,
  getProductCategory,

  getAllProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  // reviews
  createProductReview,
  getAllReviews,
  deleteReview,

  //admin
  getAdminProducts,

  // seller products
  getSellerProducts,
  deleteSellerProduct,
  updateSellerProduct,
  deleteSellerProduct,

  // seller Review products
  reviewSellerProduct,
};
