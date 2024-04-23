const catchAsync = require("../../../utils/catchAsync");
const AppError = require("../../../utils/appError");
const City = require("../../../models/cityModel");

const updateCity = catchAsync(async (req, res, next) => {
  const cityUpdated = await City.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!cityUpdated) {
    return next(new AppError("No city found with that ID", 404));
  }

  res.status(200).json({ cityUpdated });
});

module.exports = updateCity;