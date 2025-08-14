const express = require("express");
const {
  getAllViews,
  updateView,
  removeView,
  getFavourites,
  removeFavourite,
  createView,
  createFavourite,
  getViews,
} = require("../controllers/viewController");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.use(auth);

router.get("/all", getAllViews);
router.get("/view", getViews);
router.post("/view/new", createView);
router.route("/view/:id").put(updateView).delete(removeView);

router.get("/fav", getFavourites);
router.post("/fav/new", createFavourite);
router.delete("/fav/:id", removeFavourite);

module.exports = router;
