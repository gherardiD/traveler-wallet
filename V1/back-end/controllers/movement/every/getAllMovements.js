const catchAsync = require("../../../utils/catchAsync");
const Movement = require("../../../models/movementModel");
const APIFeature = require("../../../utils/apiFeatures.js");

const getAllMovements = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.userId) filter = { user: req.params.userId };

  const features = new APIFeature(Movement.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

    const movements = await features.query;

  res.status(200).json({ movements });
});

module.exports = getAllMovements;