const catchAsync = require("../../../utils/catchAsync");
const AppError = require("../../../utils/appError");
const City = require("../../../models/cityModel");

const getMyCity = catchAsync(async (req, res, next) => {
  const city = await City.findById(req.params.id);

  if (!city) {
    return next(new AppError("No city found with that ID", 404));
  }

  res.status(200).json({ city });
});

module.exports = getMyCity;
