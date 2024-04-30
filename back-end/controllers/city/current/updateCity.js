const catchAsync = require("../../../utils/catchAsync");
const AppError = require("../../../utils/appError");
const City = require("../../../models/cityModel");

const updateCity = catchAsync(async (req, res, next) => {
  const updatedCity = await City.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedCity) {
    return next(new AppError("No city found with that ID", 404));
  }

  res.status(200).json({ updatedCity });
});

module.exports = updateCity;