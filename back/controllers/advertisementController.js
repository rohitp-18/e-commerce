const expressAsyncHandler = require("express-async-handler");
const Advertisement = require("../models/advertisementModel");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary").v2;

const getAllAdvertisement = expressAsyncHandler(async (req, res, next) => {
  const advertisements = await Advertisement.find({});

  res.status(200).json({
    success: true,
    advertisements,
  });
});

const getAdvertisement = expressAsyncHandler(async (req, res, next) => {
  const advertisement = await Advertisement.findById(req.params.id);

  if (!advertisement) {
    return next(new ErrorHandler("advertisement not found", 403));
  }

  res.status(200).json({
    success: true,
    advertisement,
  });
});

const createAdvertisement = expressAsyncHandler(async (req, res, next) => {
  const {
    paymentRecipt,
    category,
    description,
    name,
    initialDate,
    expireDate,
    image,
    paymentDetails,
  } = req.body;

  if (
    !name ||
    !paymentDetails ||
    !paymentRecipt ||
    !initialDate ||
    !expireDate ||
    !category
  ) {
    return next(new ErrorHandler("please fill all required fields", 403));
  }

  // let image;

  // if (req.files) {
  //   image = await cloudinary.uploader.upload(image, {
  //     folder: "ads",
  //     width: "250",
  //     crop: "scale",
  //   });
  // }

  const advertisement = await Advertisement.create({
    name,
    paymentDetails,
    paymentRecipt,
    initialDate,
    seller: req.user._id,
    expireDate,
    category,
    description,
    // image: { url: image.secure_url, public_id: image.public_id },
    image: { url: image },
  });

  res.status(200).json({
    success: true,
    advertisement,
  });
});

const updateAdvertisement = expressAsyncHandler(async (req, res, next) => {
  const { name, expireDate } = req.body;

  const advertisement2 = await Advertisement.findById(req.params.id);

  if (!name || !expireDate) {
    return next(new ErrorHandler("please fill all required fields", 403));
  }

  if (expireDate > advertisement2.expireDate) {
    return next(new ErrorHandler("invalid expire date", 403));
  }

  let form = { name, expireDate };

  if (req.files) {
    let image = await cloudinary.uploader.upload(image, {
      folder: "ads",
      width: "250",
      crop: "scale",
    });
    form = {
      ...form,
      image: { url: image.secure_url, public_id: image.public_id },
    };
  }

  const advertisement = await Advertisement.findByIdAndUpdate(
    req.params.id,
    form
  );

  res.status(200).json({
    success: true,
    advertisement,
  });
});

const deleteAdvertisement = expressAsyncHandler(async (req, res, next) => {
  const advertisement = await Advertisement.findByIdAndDelete(req.params.id);

  if (!advertisement) {
    return next(new ErrorHandler("advertisement not found", 403));
  }

  res.status(200).json({
    success: true,
    advertisement,
  });
});

const getSellerAllAdvertisement = expressAsyncHandler(
  async (req, res, next) => {
    const advertisements = await Advertisement.find({ _id: req.user._id });

    res.status(200).json({
      success: true,
      advertisements,
    });
  }
);

const getSellerAdvertisement = expressAsyncHandler(async (req, res, next) => {
  const advertisement = await Advertisement.find({
    _id: req.params.id,
    seller: req.user._id,
  });

  if (!advertisement) {
    return next(new ErrorHandler("advertisement not found", 403));
  }

  res.status(200).json({
    success: true,
    advertisement,
  });
});

const createSellerAdvertisement = expressAsyncHandler(
  async (req, res, next) => {
    const {
      paymentRecipt,
      category,
      description,
      name,
      initialDate,
      expireDate,
      image,
      paymentDetails,
    } = req.body;

    if (
      !name ||
      !paymentDetails ||
      !paymentRecipt ||
      !initialDate ||
      !expireDate ||
      !category
    ) {
      return next(new ErrorHandler("please fill all required fields", 403));
    }

    // let image;

    // if (req.files) {
    //   image = await cloudinary.uploader.upload(image, {
    //     folder: "ads",
    //     width: "250",
    //     crop: "scale",
    //   });
    // }

    const advertisement = await Advertisement.create({
      name,
      paymentDetails,
      paymentRecipt,
      initialDate,
      seller: req.user._id,
      expireDate,
      category,
      description,
      // image: { url: image.secure_url, public_id: image.public_id },
      image: { url: image },
    });

    res.status(200).json({
      success: true,
      advertisement,
    });
  }
);

const updateSellerAdvertisement = expressAsyncHandler(
  async (req, res, next) => {
    const { name, expireDate } = req.body;

    const advertisement2 = await Advertisement.findOne({
      _id: req.params.id,
      seller: req.user._id,
    });

    if (!name || !expireDate) {
      return next(new ErrorHandler("please fill all required fields", 403));
    }

    if (expireDate > advertisement2.expireDate) {
      return next(new ErrorHandler("invalid expire date", 403));
    }

    let form = { name, expireDate };

    if (req.files) {
      let image = await cloudinary.uploader.upload(image, {
        folder: "ads",
        width: "250",
        crop: "scale",
      });
      form = {
        ...form,
        image: { url: image.secure_url, public_id: image.public_id },
      };
    }

    const advertisement = await Advertisement.findByIdAndUpdate(
      req.params.id,
      form
    );

    res.status(200).json({
      success: true,
      advertisement,
    });
  }
);

const deleteSellerAdvertisement = expressAsyncHandler(
  async (req, res, next) => {
    // const advertisement = await Advertisement.findByIdAndDelete(req.params.id);
    const advertisement = await Advertisement.findOneAndUpdate(
      { _id: req.params.id, seller: req.user._id },
      { expireDate: new Date(Date.now()) }
    );

    if (!advertisement) {
      return next(new ErrorHandler("advertisement not found", 403));
    }

    res.status(200).json({
      success: true,
      advertisement,
    });
  }
);

module.exports = {
  getAllAdvertisement,
  getAdvertisement,
  createAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,

  //seller
  getSellerAllAdvertisement,
  getSellerAdvertisement,
  createSellerAdvertisement,
  updateSellerAdvertisement,
  deleteSellerAdvertisement,
};
