const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const Currency = require("../../models/currencyModel");

const deleteCurrency = catchAsync(async (req, res, next) => {
  const currency = await Currency.findByIdAndDelete(req.params.id);

  if (!currency) {
    return next(new AppError("No currency found with that ID", 404));
  }

  res.status(204).json({ data: null });
});

module.exports = deleteCurrency;
