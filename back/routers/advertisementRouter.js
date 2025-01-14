const express = require("express");
const { auth, authorizedRole } = require("../middlewares/auth");
const {
  getAllAdvertisement,
  createAdvertisement,
  updateAdvertisement,
  deleteAdvertisement,
  getAdvertisement,
  getSellerAllAdvertisement,
  createSellerAdvertisement,
  updateSellerAdvertisement,
  deleteSellerAdvertisement,
  getSellerAdvertisement,
} = require("../controllers/advertisementController");

const router = express.Router();

router.use(auth);

router.get("/", authorizedRole("admin"), getAllAdvertisement);
router.post("/new", authorizedRole("admin"), createAdvertisement);
router.get("/seller/", authorizedRole("seller"), getSellerAllAdvertisement);
router.post("/seller/new", authorizedRole("seller"), createSellerAdvertisement);
router
  .route("/seller/:id")
  .put(authorizedRole("seller"), updateSellerAdvertisement)
  .delete(authorizedRole("seller"), deleteSellerAdvertisement)
  .get(authorizedRole("seller"), getSellerAdvertisement);
router
  .route("/:id")
  .put(authorizedRole("admin"), updateAdvertisement)
  .delete(authorizedRole("admin"), deleteAdvertisement)
  .get(authorizedRole("admin"), getAdvertisement);

module.exports = router;
