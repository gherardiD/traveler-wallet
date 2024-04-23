const express = require("express");

const getAllExpenses = require("../../controllers/expense/every/getAllExpenses");
const getExpense = require("../../controllers/expense/every/getExpense");
const createExpense = require("../../controllers/expense/every/createExpense");
const updateExpense = require("../../controllers/expense/every/updateExpense");
const deleteExpense = require("../../controllers/expense/every/deleteExpense");

const router = express.Router({ mergeParams: true });

router.route("/").get(getAllExpenses).post(createExpense);

router.route("/:id").get(getExpense).patch(updateExpense).delete(deleteExpense);

module.exports = router;
