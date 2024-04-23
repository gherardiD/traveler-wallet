const express = require("express");
// path like this: /api/v1/cities/:cityId/expenses

// USER
const getAllMyExpenses = require("../../controllers/expense/current/getAllMyExpenses");
const getMyExpense = require("../../controllers/expense/current/getMyExpense");
const createMyExpense = require("../../controllers/expense/current/createMyExpense");
const updateMyExpense = require("../../controllers/expense/current/updateMyExpense");
const deleteMyExpense = require("../../controllers/expense/current/deleteMyExpense");

const router = express.Router({ mergeParams: true });

router.route("/").get(getAllMyExpenses).post(createMyExpense);
router.route("/:id").get(getMyExpense).patch(updateMyExpense).delete(deleteMyExpense);

module.exports = router;