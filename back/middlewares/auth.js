const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/userModel");
const { redisClient } = require("../config/redis");

const auth = expressAsyncHandler(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("please login first", 403));
  }

  let _id;

  try {
    const res = jwt.verify(token, process.env.JWT_SECRET);
    _id = res._id;
  } catch (err) {
    res.clearCookie("token");
    return next(new ErrorHandler("Please Login first", 403));
  }

  if (req.redisConncted) {
    const user = await redisClient.get(`user:${_id}`);
    if (user) {
      req.user = JSON.parse(user);
      req.user.source = "redis";
      return next();
    }
  }

  if (!_id) {
    return next(new ErrorHandler("please login first", 403));
  }

  const user = await User.findById(_id);
  req.user = user;

  if (req.redisConncted) {
    await redisClient.set(`user:${_id}`, JSON.stringify(user));
  }

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

  let _id;

  try {
    const res = jwt.verify(token, process.env.JWT_SECRET);
    _id = res._id;
  } catch (err) {
    res.clearCookie("token");
  }

  if (req.redisConncted) {
    const user = await redisClient.get(`user:${_id}`);
    if (user) {
      req.user = JSON.parse(user);
      req.user.source = "redis";
      return next();
    }
  }

  if (!_id) {
    return next();
  }

  const user = await User.findById(_id);
  req.user = user;

  if (req.redisConncted) {
    await redisClient.set(`user:${_id}`, JSON.stringify(user));
  }

  next();
});

module.exports = { auth, authorizedRole, checkAuth };
