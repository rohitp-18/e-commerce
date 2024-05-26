const {
  createOrder,
  getSingleOrder,
  getAllOrder,
  myOrder,
  updateOrder,
  adminSingleOrder,
  adminDeleteOrder,
} = require("../controllers/orderController");

const express = require("express");
const router = express.Router();
const { auth, authorizedRole } = require("../middlewares/auth");

router.use(auth);
router.route("/create").post(createOrder);
router.get("/", myOrder);
router.route("/my/:id").get(getSingleOrder); //.delete(deleteOrder);
router
  .route("/admin/:id")
  .put(authorizedRole("admin"), updateOrder)
  .delete(authorizedRole("admin"), adminDeleteOrder)
  .get(authorizedRole("admin"), adminSingleOrder);
router.get("/admin", authorizedRole("admin"), getAllOrder);

module.exports = router;
