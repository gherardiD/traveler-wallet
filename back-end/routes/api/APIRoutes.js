const express = require("express");

const getAllCities = require("../../controllers/city/every/getAllCities");
const getCity = require("../../controllers/city/every/getCity");
const createCity = require("../../controllers/city/every/createCity");
const updateCity = require("../../controllers/city/every/updateCity");
const deleteCity = require("../../controllers/city/every/deleteCity");

const getAllExpenses = require("../../controllers/expense/every/getAllExpenses");
const getExpense = require("../../controllers/expense/every/getExpense");
const createExpense = require("../../controllers/expense/every/createExpense");
const updateExpense = require("../../controllers/expense/every/updateExpense");
const deleteExpense = require("../../controllers/expense/every/deleteExpense");

const getAllUsers = require("../../controllers/user/every/getAllUsers");
const getUser = require("../../controllers/user/every/getUser");
const createUser = require("../../controllers/user/every/createUser");
const updateUser = require("../../controllers/user/every/updateUser");
const deleteUser = require("../../controllers/user/every/deleteUser");

const APIExpensesRouter = require("./APIExpensesRoutes.js");

const router = express.Router();

router.use("/users/:userId/expenses", APIExpensesRouter);

router
  .route("/cities/")
  .get(getAllCities)
  .post(createCity);

router
  .route("/cities/:id")
  .get(getCity)
  .patch(updateCity)
  .delete(deleteCity);

router
  .route("/expenses/")
  .get(getAllExpenses)
  .post(createExpense);

router
  .route("/expenses/:id")
  .get(getExpense)
  .patch(updateExpense)
  .delete(deleteExpense);

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