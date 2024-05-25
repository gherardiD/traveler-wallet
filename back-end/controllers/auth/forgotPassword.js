const User = require("../../models/userModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const sendEmail = require("../../utils/sendEmail");

const forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("There is no user with that email address", 404));
  }

  // generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // const resetURL = `${req.protocol}://localhost:${process.env.FRONT_END_PORT}/reset-password/${resetToken}`;
  const resetURL = `${process.env.FRONT_END_URL}/reset-password/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  console.log(resetURL);

  try {
    const msg = {
      to: req.body.email,
      from: "gherardi.daniele.studente@itispaleocapa.it",
      subject: "Your password reset token (valid for 10 min)",
      text: "Reset password",
      html: `<p>${message}</p>`,
    };

    await sendEmail.send(msg);

    console.log("Email sent");

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

module.exports = forgotPassword;
