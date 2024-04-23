const Expense = require("../models/expenseModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handleFactory");

exports.setUserId = (req, res, next) => {
  req.params.userId = req.user._id;
  next();
};

exports.addUserIdIntoBodyReq = (req, res, next) => {
  req.body.user = req.user._id;
  next();
};

exports.getAllExpenses = factory.getAll(Expense);
exports.getExpense = factory.getOne(Expense);
exports.createExpense = factory.createOne(Expense);
exports.updateExpense = factory.updateOne(Expense);
exports.deleteExpense = factory.deleteOne(Expense);

// TODO: CALCULATE STATS WITH AGGREGATION //
