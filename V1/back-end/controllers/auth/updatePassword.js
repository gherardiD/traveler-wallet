const User = require("../../models/userModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const sendResponseWithToken = require("../../utils/sendResponseWithToken");

const updatePassword = catchAsync(async (req, res, next) => {
  // get the user from the collection
  const user = await User.findById(req.user._id).select("+password");

  // check if the POSTed password is correct
  if (
    !(await user.isPasswordCorrected(req.body.passwordCurrent, user.password))
  ) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // if the password is correct, update the password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  // send the response
  sendResponseWithToken(user, 200, res);
});

module.exports = updatePassword;
