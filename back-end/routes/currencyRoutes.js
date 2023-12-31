const express = require("express");

const {
  getAllCurrencies,
  getCurrency,
  createCurrency,
  updateCurrency,
  deleteCurrency,
} = require("../controllers/currencyController.js");

const router = express.Router();

router.route("/").get(getAllCurrencies).post(createCurrency);
router
  .route("/:id")
  .get(getCurrency)
  .patch(updateCurrency)
  .delete(deleteCurrency);

module.exports = router;
