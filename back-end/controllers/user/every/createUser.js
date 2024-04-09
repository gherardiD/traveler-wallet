const User = require("../../../models/userModel");
const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");

const createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  res.status(201).json({ newUser });
});

module.exports = createUser;