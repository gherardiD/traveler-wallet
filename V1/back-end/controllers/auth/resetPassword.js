const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const crypto = require("crypto");
const User = require("../../models/userModel");
const sendResponseWithToken = require("../../utils/sendResponseWithToken");

const resetPassword = catchAsync(async (req, res, next) => {
  // get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // if token has not expired and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // log the user in, send JWT
  sendResponseWithToken(user, 200, res);
});

module.exports = resetPassword;
