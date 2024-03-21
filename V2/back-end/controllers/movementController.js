const Movement = require("../models/movementModel");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handleFactory");

exports.setUserId = (req, res, next) => {
  req.params.userId = req.user._id;
  next();
};

exports.getAllMovements = factory.getAll(Movement);
exports.getMovement = factory.getOne(Movement);
exports.createMovement = factory.createOne(Movement);
exports.updateMovement = factory.updateOne(Movement);
exports.deleteMovement = factory.deleteOne(Movement);

// TODO: CALCULATE STATS WITH AGGREGATION //
