const Movement = require("../../../models/movementModel");
const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");

const createMovement = catchAsync(async (req, res, next) => {
  const newMovement = await Movement.create(req.body);

  res.status(201).json({ newMovement });
});

module.exports = createMovement;