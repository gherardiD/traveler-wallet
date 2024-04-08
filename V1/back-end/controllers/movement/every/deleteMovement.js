const Movement = require("../../../models/movementModel");
const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");

const deleteMovement = catchAsync(async (req, res, next) => {
  const movement = await Movement.findByIdAndDelete(req.params.id);

  if (!movement) {
    return next(new AppError("No movement found with that ID", 404));
  }

  res.status(204).json({status: "success"});
});

module.exports = deleteMovement;