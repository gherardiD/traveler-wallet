const Movement = require("../models/movementModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllMovements = catchAsync(async (req, res, next) => {
  const userId = req.user.id;
  const movements = await Movement.find({ user: userId });
  // console.log(movements);

  res.status(200).json({
    status: "success",
    results: movements.length,
    data: {
      movements,
    },
  });
});

exports.getMovement = catchAsync(async (req, res, next) => {
  const movement = await Movement.findOne({ _id: req.params.id });

  if (!movement) {
    return next(new AppError("No movement found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      movement,
    },
  });
});

exports.createMovement = catchAsync(async (req, res, next) => {
  const newMovement = await Movement.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      movement: newMovement,
    },
  });
});

exports.updateMovement = catchAsync(async (req, res, next) => {
  const movement = await Movement.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!movement) {
    return next(new AppError("No movement found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      movement,
    },
  });
});

exports.deleteMovement = catchAsync(async (req, res, next) => {
  const movement = await Movement.findOneAndDelete({
    _id: req.params.id,
  });

  if (!movement) {
    return next(new AppError("No movement found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
