const Movement = require("../../../models/movementModel");
const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");

const updateMovement = catchAsync(async (req, res, next) => {
  const movementUpdated = await Movement.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!movementUpdated) {
    return next(new AppError("No movement found with that ID", 404));
  }

  res.status(200).json({ movementUpdated });
});

module.exports = updateMovement;