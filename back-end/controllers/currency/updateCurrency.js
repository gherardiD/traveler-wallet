const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const Currency = require("../../models/currencyModel");

const updateCurrency = catchAsync(async (req, res, next) => {
  const currencyUpdated = await Currency.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!currencyUpdated) {
    return next(new AppError("No currency found with that ID", 404));
  }

  res.status(200).json({ currencyUpdated });
});

module.exports = updateCurrency;