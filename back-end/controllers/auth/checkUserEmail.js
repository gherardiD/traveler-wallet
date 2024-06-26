const catchAsync = require("../../utils/catchAsync");
const AppError = require("../../utils/appError");
const sendEmail = require("../../utils/sendEmail");

const checkUserEmail = catchAsync(async (req, res, next) => {
  // generate the random reset token
  const resetToken = req.user.createEmailConfirmToken();
  await req.user.save({ validateBeforeSave: false });

  // const resetURL = `${req.protocol}://localhost:${process.env.FRONT_END_PORT}/confirm-email/${resetToken}`;
  const resetURL = `${process.env.FRONT_END_URL}/confirm-email/${resetToken}`;

  // * GET THE LINK FROM CONSOLE AT SCHOOL
  console.log(resetURL);

  const message = `Click on this link to confirm your email: ${resetURL}`;

  try {
    const msg = {
      to: req.user.email,
      from: "gherardi.daniele.studente@itispaleocapa.it",
      subject: "Your email confirmation token (valid for 10 min)",
      text: "Confirm email",
      html: `<strong>${message}</strong>`,
    };

    await sendEmail.send(msg);

    console.log("Email sent");

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    req.user.emailConfirmToken = undefined;
    req.user.emailConfirmExpires = undefined;
    await req.user.save({ validateBeforeSave: false });
    return next(
      new AppError("There was an error sending the email. Try again later!"),
      500
    );
  }
});

module.exports = checkUserEmail;
