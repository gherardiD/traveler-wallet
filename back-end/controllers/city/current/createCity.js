const catchAsync = require("../../../utils/catchAsync");
const City = require("../../../models/cityModel");

const createCity = catchAsync(async (req, res, next) => {
  if (req.user._id){ 
    req.body.user = req.user._id;
  }
  const newCity = await City.create(req.body);

  res.status(201).json({ newCity });
});

module.exports = createCity;
