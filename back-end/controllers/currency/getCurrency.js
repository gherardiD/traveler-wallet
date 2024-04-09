const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const Currency = require("../../models/currencyModel");

const getCurrency = catchAsync(async (req, res, next) => {
  const currency = await Currency.findById(req.params.id);

  if (!currency) {
    return next(new AppError("No currency found with that ID", 404));
  }

  res.status(200).json({ currency });
});

module.exports = getCurrency;
