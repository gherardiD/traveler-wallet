const catchAsync = require("../../utils/catchAsync");
const Currency = require("../../models/currencyModel");

const getAllCurrencies = catchAsync(async (req, res, next) => {
  const currencies = await Currency.find();

  res.status(200).json({ currencies });
});

module.exports = getAllCurrencies;