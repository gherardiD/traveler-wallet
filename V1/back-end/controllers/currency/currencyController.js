const Currency = require("../../models/currencyModel");

const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");

exports.getAllCurrencies = catchAsync(async (req, res, next) => {
  const currencies = await Currency.find();

  res.status(200).json({
    status: "success",
    results: currencies.length,
    data: {
      currencies,
    },
  });
});

exports.getCurrency = catchAsync(async (req, res, next) => {
  const currency = await Currency.findById(req.params.id);

  if (!currency) {
    return next(new AppError("No currency found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      currency,
    },
  });
});

exports.createCurrency = catchAsync(async (req, res, next) => {
  const newCurrency = await Currency.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      currency: newCurrency,
    },
  });
});

exports.updateCurrency = catchAsync(async (req, res, next) => {
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

  res.status(200).json({
    status: "success",
    data: {
      currency: currencyUpdated,
    },
  });
});

exports.deleteCurrency = catchAsync(async (req, res, next) => {
  const currency = await Currency.findByIdAndDelete(req.params.id);

  if (!currency) {
    return next(new AppError("No currency found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
