const User = require("../../../models/userModel");
const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");

const getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new AppError("No document found with that ID", 404));
  }

  res.status(200).json({ user });
});

module.exports = getMe;
