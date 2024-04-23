const User = require("../../../models/userModel");
const catchAsync = require("../../../utils/catchAsync");

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({ users });
});

module.exports = getAllUsers;
