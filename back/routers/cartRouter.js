const {
  addToCartController,
  removeFromCart,
  getAllCart,
} = require("../controllers/cartController");
const express = require("express");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.use(auth);

router.get("/", getAllCart);
router.post("/add", addToCartController);
router.delete("/product/:id", removeFromCart);

module.exports = router;
