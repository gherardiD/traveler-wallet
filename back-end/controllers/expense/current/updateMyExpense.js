const Expense = require("../../../models/expenseModel");
const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");

const updateMyExpense = catchAsync(async (req, res, next) => {
  const updatedExpense = await Expense.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedExpense) {
    return next(new AppError("No expense found with that ID", 404));
  }

  res.status(200).json({ updatedExpense });
});

module.exports = updateMyExpense;
