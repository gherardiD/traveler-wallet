const express = require("express");

// CURRENCY
const getAllCurrencies = require("../../controllers/currency/getAllCurrencies");
const getCurrency = require("../../controllers/currency/getCurrency");
const createCurrency = require("../../controllers/currency/createCurrency");
const updateCurrency = require("../../controllers/currency/updateCurrency");
const deleteCurrency = require("../../controllers/currency/deleteCurrency");

// AUTH
const protect = require("../../controllers/auth/protect");
const restrictTo = require("../../controllers/auth/restrictTo");

const router = express.Router();

router
  .route("/")
  .get(getAllCurrencies)
  .post(protect, restrictTo("admin"), createCurrency);
router
  .route("/:id")
  .get(protect, getCurrency)
  .patch(protect, restrictTo("admin"), updateCurrency)
  .delete(protect, restrictTo("admin"), deleteCurrency);

module.exports = router;
