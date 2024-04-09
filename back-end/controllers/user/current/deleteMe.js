const User = require("../../../models/userModel");
const catchAsync = require("../../../utils/catchAsync");

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, {
    $set: {
      active: false,
    },
  });

  res.status(204).json({ status: "success" });
});

module.exports = deleteMe;
