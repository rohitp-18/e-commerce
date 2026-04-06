const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");

const auth = expressAsyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("please login first", 403));
  }

  let _id, role;

  try {
    const res = jwt.verify(token, process.env.JWT_SECRET);
    _id = res._id;
    role = res.role;
  } catch (err) {
    res.clearCookie("token");
    return next(new ErrorHandler("Please Login first", 403));
  }

  if (!_id) {
    return next(new ErrorHandler("please login first", 403));
  }

  req.user = { _id, role };

  next();
});

const authorizedRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler("you are not authorized to perform this action", 403),
      );
    }
    next();
  };
};

const checkAuth = expressAsyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next();
  }

  let _id, role;

  try {
    const res = jwt.verify(token, process.env.JWT_SECRET);
    _id = res._id;
    role = res.role;
  } catch (err) {
    res.clearCookie("token");
  }

  if (!_id) {
    return next();
  }

  req.user = { _id, role };

  next();
});

module.exports = { auth, authorizedRole, checkAuth };
