const Expense = require("../../../models/expenseModel");
const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");

const createExpense = catchAsync(async (req, res, next) => {
  const newExpense = await Expense.create(req.body);

  res.status(201).json({ newExpense });
});

module.exports = createExpense;
