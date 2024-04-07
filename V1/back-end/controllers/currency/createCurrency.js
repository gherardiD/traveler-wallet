const catchAsync = require("../../utils/catchAsync");
const Currency = require("../../models/currencyModel");

const createCurrency = catchAsync(async (req, res, next) => {
  const newCurrency = await Currency.create(req.body);

  res.status(201).json({ newCurrency });
});

module.exports = createCurrency;
