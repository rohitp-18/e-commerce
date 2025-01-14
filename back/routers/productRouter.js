const express = require("express");
const { auth, authorizedRole } = require("../middlewares/auth");
const {
  getAllProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  // reviews
  createProductReview,
  getAllReviews,
  deleteReview,
  getAdminProducts,
  getSellerProducts,
  deleteSellerProduct,
  updateSellerProduct,
  reviewSellerProduct,
} = require("../controllers/productController");

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/admin").get(auth, authorizedRole("admin"), getAdminProducts);
router
  .route("/seller")
  .get(auth, authorizedRole("seller"), getSellerProducts)
  .post(auth, authorizedRole("seller"), createProduct);
router.route("/new").post(auth, authorizedRole("admin"), createProduct);
router
  .route("/seller/:id")
  .delete(auth, authorizedRole("seller"), deleteSellerProduct)
  .put(auth, authorizedRole("seller"), updateSellerProduct);
router
  .route("/:id")
  .get(getProduct)
  .delete(auth, authorizedRole("admin"), deleteProduct)
  .put(auth, authorizedRole("admin"), updateProduct);

router.route("/:id/review/new").post(auth, createProductReview);
router.route("/:id/review/").get(getAllReviews).delete(auth, deleteReview);
router
  .route("/:id/seller/review")
  .get(auth, authorizedRole("seller"), reviewSellerProduct);

module.exports = router;
