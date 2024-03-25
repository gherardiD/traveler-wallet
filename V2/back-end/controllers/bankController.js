const Bank = require("../models/bankModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getBankBySlug = catchAsync(async (req, res, next) => {
  const bank = await Bank.findOne({ slug: req.params.slug });

  if (!bank) {
    return next(new AppError("No bank found with that slug", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      bank,
    },
  });
});