const Expense = require("../../../models/expenseModel");
const catchAsync = require("../../../utils/catchAsync");

const createMyExpense = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  if (req.params.cityId) req.body.city = req.params.cityId;
  const newExpense = await Expense.create(req.body);

  res.status(201).json({ newExpense });
});

module.exports = createMyExpense;