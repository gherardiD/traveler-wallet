const catchAsync = require("../../../utils/catchAsync");
const AppError = require("../../../utils/appError");
const City = require("../../../models/cityModel");

const deleteMyCity = catchAsync(async (req, res, next) => {
  const city = await City.findByIdAndDelete(req.params.id);

  if (!city) {
    return next(new AppError("No city found with that ID", 404));
  }

  res.status(204).json({status: "success"});
});

module.exports = deleteMyCity;
