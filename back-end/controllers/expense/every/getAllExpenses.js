const catchAsync = require("../../../utils/catchAsync.js");
const Expense = require("../../../models/expenseModel");
const APIFeature = require("../../../utils/apiFeatures.js");

const getAllExpenses = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.userId) filter = { user: req.params.userId };

  const features = new APIFeature(Expense.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const expenses = await features.query;

  res.status(200).json({ expenses });
});

module.exports = getAllExpenses;
