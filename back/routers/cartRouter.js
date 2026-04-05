const {
  addToCartController,
  removeFromCart,
  getAllCart,
  updateCartItem,
} = require("../controllers/cartController");
const express = require("express");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.use(auth);

router.get("/", getAllCart);
router.post("/add", addToCartController);
router.route("/product/:id").delete(removeFromCart).put(updateCartItem);

module.exports = router;
