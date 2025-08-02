const express = require("express");
const { auth, authorizedRole, checkAuth } = require("../middlewares/auth");
const {
  createSearch,
  createAdminSearch,
  getSearches,
  deleteSearch,
  adminDeleteSearch,
  getAdminSearch,
  updateSearch,
} = require("../controllers/searchController");

const router = express.Router();

router.post("/create", auth, createSearch);
router.post("/admin/create", auth, authorizedRole("admin"), createAdminSearch);
router.get("/searches", checkAuth, getSearches);
router.get("/admin/searches", auth, authorizedRole("admin"), getAdminSearch);
router.delete("/search/:id", auth, deleteSearch);
router
  .route("/admin/search/:id")
  .delete(auth, authorizedRole("admin"), adminDeleteSearch)
  .put(auth, authorizedRole("admin"), updateSearch);

module.exports = router;
