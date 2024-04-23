const User = require("../../models/userModel");
const catchAsync = require("../../utils/catchAsync");
const crypto = require("crypto");
const AppError = require("../../utils/appError");
const sendResponseWithToken = require("../../utils/sendResponseWithToken");

const confirmEmail = catchAsync(async (req, res, next) => {
  // get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOneAndUpdate(
    {
      emailConfirmToken: hashedToken,
      emailConfirmExpires: { $gt: Date.now() },
    },
    {
      $set: {
        active: true,
        emailConfirmToken: null,
        emailConfirmExpires: null,
      },
    },
    { new: true, runValidators: true }
  );

  // if token has not expired and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  // log the user in, send JWT
  sendResponseWithToken(user, 200, res);
});

module.exports = confirmEmail;
