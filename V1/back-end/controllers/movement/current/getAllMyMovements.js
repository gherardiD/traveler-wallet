const catchAsync = require("../../../utils/catchAsync");
const Movement = require("../../../models/movementModel");

const getAllMyMovements = catchAsync(async (req, res, next) => {
  const movements = await Movement.find({user: req.user._id});

  res.status(200).json({ movements });
});

module.exports = getAllMyMovements;