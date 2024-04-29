const catchAsync = require("../../../utils/catchAsync");
const City = require("../../../models/cityModel");

const getAllCities = catchAsync(async (req, res, next) => {
  const cities = await City.find({user: req.user._id});

  res.status(200).json({ cities });
});

module.exports = getAllCities;