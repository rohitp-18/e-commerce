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
} = require("../controllers/productController");

const router = express.Router();

router.route("/").get(getAllProducts);
router.route("/admin").get(auth, authorizedRole("admin"), getAdminProducts);
router.route("/new").post(auth, createProduct);
router
  .route("/:id")
  .get(getProduct)
  .delete(auth, authorizedRole("admin"), deleteProduct)
  .put(auth, authorizedRole("admin"), updateProduct);

router.route("/:id/review/new").post(auth, createProductReview);
router.route("/:id/review/").get(getAllReviews).delete(auth, deleteReview);

module.exports = router;
