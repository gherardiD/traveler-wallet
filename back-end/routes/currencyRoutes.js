const express = require("express");

const {
  getAllCurrencies,
  getCurrency,
  createCurrency,
  updateCurrency,
  deleteCurrency,
} = require("../controllers/currencyController.js");

const { protect, restrictTo } = require("../controllers/authController.js");

const router = express.Router();

router
  .route("/")
  .get(getAllCurrencies) // protect
  .post(protect, restrictTo("admin"), createCurrency);
router
  .route("/:id")
  .get(protect, getCurrency)
  .patch(protect, restrictTo("admin"), updateCurrency)
  .delete(protect, restrictTo("admin"), deleteCurrency);

module.exports = router;
