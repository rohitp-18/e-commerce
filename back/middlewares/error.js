module.exports = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;

  let message = err.message || "Internal Server Error";

  if (err.code === 11000) {
    return next(
      res.status(statusCode).json({
        success: false,
        message: `${Object.keys(err.keyPattern).join(", ")} is already exists`,
      }),
    );
  }

  res.status(statusCode).json({
    success: false,
    message,
    stack: err.stack,
  });
};
