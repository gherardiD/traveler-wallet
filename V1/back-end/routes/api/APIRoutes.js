const express = require("express");

const getAllCurrencies = require("../../controllers/currency/getAllCurrencies");
const getCurrency = require("../../controllers/currency/getCurrency");
const createCurrency = require("../../controllers/currency/createCurrency");
const updateCurrency = require("../../controllers/currency/updateCurrency");
const deleteCurrency = require("../../controllers/currency/deleteCurrency");

// const {
//   getAllMovements,
//   getMovement,
//   createMovement,
//   updateMovement,
//   deleteMovement,
// } = require("../controllers/movementController.js");

const getAllUsers = require("../../controllers/user/every/getAllUsers");
const getUser = require("../../controllers/user/every/getUser");
const createUser = require("../../controllers/user/every/createUser");
const updateUser = require("../../controllers/user/every/updateUser");
const deleteUser = require("../../controllers/user/every/deleteUser");

// const APIMovementsRoutes = require("./APIMovementsRoutes.js");

const router = express.Router();

// router.use("/users/:userId/movements", APIMovementsRoutes);

router
  .route("/currencies/")
  .get(getAllCurrencies)
  .post(createCurrency);

router
  .route("/currencies/:id")
  .get(getCurrency)
  .patch(updateCurrency)
  .delete(deleteCurrency);

// router
//   .route("/movements/")
//   .get(getAllMovements)
//   .post(createMovement);

// router
//   .route("/movements/:id")
//   .get(getMovement)
//   .patch(updateMovement)
//   .delete(deleteMovement);

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