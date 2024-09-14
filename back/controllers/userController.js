const User = require("../models/userModel");
const sendToken = require("../utils/sendToken");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const ErrorHandler = require("../utils/errorHandler");
const cloudinary = require("cloudinary").v2;
const Order = require("../models/orderModel");
const sendMail = require("../config/sendMail");

const loginHandler = expressAsyncHandler(async (req, res, next) => {
  let { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please fill all required fields", 400));
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Invalid eamil and password", 400));
  }
  const comparePassword = await user.comparePassword(password);

  if (!comparePassword) {
    return next(new ErrorHandler("Invalid email and password", 400));
  }

  sendToken(res, user, 200);
});

const registerUser = expressAsyncHandler(async (req, res, next) => {
  const { name, email, password, image } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please fill all required filleds", 400));
  }

  const avatar = await cloudinary.uploader.upload(image, {
    folder: "Avatar",
    width: 150,
    crop: "scale",
  });

  const user = await User.create({
    name,
    email,
    password,
    avatar: { public_id: avatar.public_id, url: avatar.secure_url },
    // avatar: { public_id: "hoo", url: "hoo" },
  });

  if (!user) {
    return next(new ErrorHandler("Internal Error", 500));
  }

  sendToken(res, user, 201);
});

const userInfo = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }
  sendToken(res, user, 200);
});

const logoutUser = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  res
    .status(200)
    .cookie("token", null, {
      expireIn: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logout successfully",
    });
});

const updateUser = expressAsyncHandler(async (req, res, next) => {
  const { name, email, image } = req.body;

  if (!name || !email) {
    return next(new ErrorHandler("please fill all required fields", 500));
  }

  let avatar;

  if (image) {
    avatar = await cloudinary.uploader.upload(
      image,
      {
        folder: "Avatar",
        width: 150,
        crop: "scale",
      },
      (err, data) => {
        console.log(err, data);
      }
    );
  }

  const data = {
    avatar: avatar
      ? { public_id: avatar.public_id, url: avatar.secure_url }
      : req.user.avatar,
    name,
    email,
  };

  console.log(data);

  const user = await User.findByIdAndUpdate(req.user._id, data);

  res.status(200).json({
    success: true,
    user,
  });
});

const updatePassword = expressAsyncHandler(async (req, res, next) => {
  const { password, oldPassword, confirmPassword } = req.body;

  if (!oldPassword || !password || !confirmPassword) {
    return next(new ErrorHandler("Please fill all required fields", 400));
  }

  if (password !== confirmPassword) {
    return next(new ErrorHandler("Passwords does not match", 400));
  }

  if (req.body.oldPassword === req.body.password) {
    return next(
      new ErrorHandler("old password and new password canonot be same", 400)
    );
  }

  const user = await User.findById(req.user._id);

  const comparePassword = await user.comparePassword(oldPassword);

  if (!comparePassword) {
    return next(new ErrorHandler("Old password is incorrect", 400));
  }

  user.password = password;

  await user.save({ validateBeforeSave: true, runValidators: true });

  res.status(200).json({
    success: true,
    user,
    message: "Password updated successfully",
  });
});

const forgotPassword = expressAsyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Invalid Email Address", 404));
  }
  const token = "";
  user.resetPasswordToken = token;
  user.resetPasswordExpire = new Date(Date.now() + 10 * 60 * 1000);

  await user.save();

  const data = {
    email,
    subject: "Forgot Password Email send",
    text: "forgot email password email send be done",
    html: `<div>
      <h2>Forgot Email Password </h2>
      <p>
        this email has to send on the request of forgot password this link valid for only 10 minutes if you not apply for this then just ignore it
      </p><br><br>
      <a style="padding-top: 20px" href=${token}>Click Here</a> to reset password
    </div>`,
  };

  sendMail(data, next);

  res.status(200).json({
    success: true,
    message: "Email has been sended to your emaill",
  });
});

const passwordToken = async (req, next) => {
  next();
};

const forgotPasswordToken = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findOne({ resetPasswordToken: req.params.id });

  if (!user) {
    return next(new ErrorHandler("Invalid Link", 400));
  }

  if (user.resetPasswordExpire < new Date(Date.now())) {
    return next(new ErrorHandler("Invalid Link", 400));
  }

  req.user = user;

  res.status(200).json({
    success: true,
    message: "Email Verified",
  });
});

const forgotPasswordChange = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findOne({ resetPasswordToken: req.params.id });

  if (!user) {
    return next(new ErrorHandler("Invalid Link", 400));
  }

  if (user.resetPasswordExpire < new Date(Date.now())) {
    return next(new ErrorHandler("Invalid Link", 400));
  }

  req.user = user;

  req.user.password = req.password;
  req.user.resetPasswordExpire = null;
  req.user.resetPasswordToken = null;

  await req.user.save();

  res.status(200).json({
    success: true,
    message: "Password Changed successfully",
  });
});

const getAllUsers = expressAsyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

const getUser = expressAsyncHandler(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler("Please provide user id", 400));
  }

  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

const adminUpdateUser = expressAsyncHandler(async (req, res, next) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return next(new ErrorHandler("Please fill all required fields", 400));
  }

  if (!req.params.id) {
    return next(new ErrorHandler("Please provide user id", 400));
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      role,
    },
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

const deleteUser = expressAsyncHandler(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler("Please provide user id", 400));
  }

  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new ErrorHandler("user not found", 404));
  }

  const order = await Order.deleteMany({ user: user._id });

  res.status(200).json({
    success: true,
    message: "user deleted successfully",
  });
});

module.exports = {
  //user
  logoutUser,
  registerUser,
  userInfo,
  loginHandler,
  updatePassword,
  forgotPassword,
  forgotPasswordChange,
  forgotPasswordToken,
  updateUser,
  // admin
  getAllUsers,
  getUser,
  adminUpdateUser,
  deleteUser,
};
