const Expense = require("../../../models/expenseModel");
const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");

const updateMyExpense = catchAsync(async (req, res, next) => {
  const expenseUpdated = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!expenseUpdated) {
    return next(new AppError("No expense found with that ID", 404));
  }

  res.status(200).json({ expenseUpdated });
});

module.exports = updateMyExpense;
