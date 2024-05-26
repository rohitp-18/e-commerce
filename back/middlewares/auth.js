const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");

const auth = expressAsyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("please login first", 403));
  }

  const { _id } = jwt.verify(token, process.env.JWT_SECRET);
  if (!_id) {
    return next(new ErrorHandler("please login first", 403));
  }

  const user = await User.findById(_id);
  req.user = user;

  next();
});

const authorizedRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler("you are not authorized to perform this action", 403)
      );
    }
    next();
  };
};

module.exports = { auth, authorizedRole };
