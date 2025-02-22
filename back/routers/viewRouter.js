const express = require("express");
const {
  getAllViews,
  updateView,
  removeView,
  getFavorites,
  removeFavorite,
  createView,
  createFavorite,
  getViews,
} = require("../controllers/viewController");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.use(auth);

router.get("/all", getAllViews);
router.get("/view", getViews);
router.post("/view/new", createView);
router.route("/view/:id").put(updateView).delete(removeView);

router.get("/fav", getFavorites);
router.post("/fav/new", createFavorite);
router.delete("/fav/:id", removeFavorite);

module.exports = router;
