const jwt = require("jsonwebtoken");

const sendToken = (res, user, statusCode) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000,
  });

  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      sameSite: false,
      expires: new Date(
        Date.now() + process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000
      ),
    })
    .json({
      success: true,
      token,
      user,
    });
};

module.exports = sendToken;
