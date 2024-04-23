const Expense = require("../../../models/expenseModel");
const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");

const deleteExpense = catchAsync(async (req, res, next) => {
  const expense = await Expense.findByIdAndDelete(req.params.id);

  if (!expense) {
    return next(new AppError("No expense found with that ID", 404));
  }

  res.status(204).json({ status: "success" });
});

module.exports = deleteExpense;
