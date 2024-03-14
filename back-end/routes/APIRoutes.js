const express = require("express");

const {
  getAllCurrencies,
  getCurrency,
  createCurrency,
  updateCurrency,
  deleteCurrency,
} = require("../controllers/currencyController.js");

const {
  getAllMovements,
  getMovement,
  createMovement,
  updateMovement,
  deleteMovement,
} = require("../controllers/movementController.js");

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");

const router = express.Router();

router
  .route("/currencies/")
  .get(getAllCurrencies)
  .post(createCurrency);
router
  .route("/currencies/:id")
  .get(getCurrency)
  .patch(updateCurrency)
  .delete(deleteCurrency);

router
  .route("/movements/")
  .get(getAllMovements)
  .post(createMovement);
router
  .route("/movements/:id")
  .get(getMovement)
  .patch(updateMovement)
  .delete(deleteMovement);

router
  .route("/users/")
  .get(getAllUsers)
  .post(createUser);
router
  .route("/users/:id")
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

module.exports = router;