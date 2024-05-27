const express = require("express");

// USER
const getAllMyExpenses = require("../../controllers/expense/current/getAllMyExpenses");
const getMyExpense = require("../../controllers/expense/current/getMyExpense");
const createMyExpense = require("../../controllers/expense/current/createMyExpense");
const updateMyExpense = require("../../controllers/expense/current/updateMyExpense");
const deleteMyExpense = require("../../controllers/expense/current/deleteMyExpense");

// ADMIN
const getAllExpenses = require("../../controllers/expense/every/getAllExpenses");
const getExpense = require("../../controllers/expense/every/getExpense");
const createExpense = require("../../controllers/expense/every/createExpense");
const updateExpense = require("../../controllers/expense/every/updateExpense");
const deleteExpense = require("../../controllers/expense/every/deleteExpense");

// AUTH
const protect = require("../../controllers/auth/protect");
const restrictTo = require("../../controllers/auth/restrictTo");

const {
  getExpenseStats,
} = require("../../controllers/admin/expenseStatsController");

const router = express.Router();

router.route("/stats").get(getExpenseStats);

router.use(protect);

router.route("/").get(getAllMyExpenses).post(createMyExpense);

router
  .route("/:id")
  .get(getMyExpense)
  .patch(updateMyExpense)
  .delete(deleteMyExpense);

router.use(restrictTo("admin"));

router.route("/admin").get(getAllExpenses).post(createExpense);

router.route("/:id").get(getExpense).patch(updateExpense).delete(deleteExpense);

// TODO IMPLEMENT ALL ROUTES
// router.route("/expensiest-expenses").get( getAllExpenses);
// router.route("/cheapest-expenses").get( getAllExpenses);

// expenses specific month
// router.route("/year/:year").get( getAllExpenses);

module.exports = router;
