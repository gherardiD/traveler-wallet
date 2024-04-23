const express = require("express");

const nestedExpenseRouter = require("./nestedExpenseRoutes");

// CITY
const getAllCities = require("../../controllers/city/current/getAllCities");
const getCity = require("../../controllers/city/current/getCity");
const createCity = require("../../controllers/city/current/createCity");
const updateCity = require("../../controllers/city/current/updateCity");
const deleteCity = require("../../controllers/city/current/deleteCity");

// AUTH
const protect = require("../../controllers/auth/protect");
const restrictTo = require("../../controllers/auth/restrictTo");

const router = express.Router();

router.use(protect);

router.use("/:cityId/expenses", nestedExpenseRouter);

router
  .route("/")
  .get(getAllCities)
  .post(createCity);
router
  .route("/:id")
  .get(getCity)
  .patch(updateCity)
  .delete(deleteCity);

module.exports = router;
