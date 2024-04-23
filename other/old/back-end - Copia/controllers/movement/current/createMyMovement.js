const Movement = require("../../../models/movementModel");
const catchAsync = require("../../../utils/catchAsync");

const createMyMovement = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  const newMovement = await Movement.create(req.body);

  res.status(201).json({ newMovement });
});

module.exports = createMyMovement;