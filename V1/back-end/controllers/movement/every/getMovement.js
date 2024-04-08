const Movement = require("../../../models/movementModel");
const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");

const getMovement = catchAsync(async (req, res, next) => {
  const movement = await Movement.findById(req.params.id);

  if (!movement) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({ movement });
});

module.exports = getMovement;