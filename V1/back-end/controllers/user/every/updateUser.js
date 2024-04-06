const User = require("../../../models/userModel");
const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");

const updateUser = catchAsync(async (req, res, next) => {
  const userUpdated = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!userUpdated) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({ userUpdated });
});

module.exports = updateUser;
