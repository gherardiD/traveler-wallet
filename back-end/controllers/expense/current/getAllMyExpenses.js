const catchAsync = require("../../../utils/catchAsync");
const Expense = require("../../../models/expenseModel");

const getAllMyExpenses = catchAsync(async (req, res, next) => {
  let filter = {user: req.user._id};
  if (req.params.cityId) filter = { city: req.params.cityId, ...filter};
  const expenses = await Expense.find(filter);

  res.status(200).json({ expenses });
});

module.exports = getAllMyExpenses;
