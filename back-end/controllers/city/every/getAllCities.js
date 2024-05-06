const catchAsync = require("../../../utils/catchAsync");
const City = require("../../../models/cityModel");

const getAllCities = catchAsync(async (req, res, next) => {
  const cities = await City.find();

  res.status(200).json({ cities });
});

module.exports = getAllCities;