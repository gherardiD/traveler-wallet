const Expense = require("../../../models/expenseModel");
const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");

const getMyExpense = catchAsync(async (req, res, next) => {
  const expense = await Expense.findById(req.params.id);

  if (!expense) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({ expense });
});

module.exports = getMyExpense;
