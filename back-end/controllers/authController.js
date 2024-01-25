const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const sendEmail = require("../utils/email");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

// * RESPONSE TOOKEN GENERATION METHODS * //
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendResponseWithToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // set cookie options
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  // send cookie
  res.cookie("jwt", token, cookieOptions);

  // remove password from output
  user.password = undefined;
  // user.active = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// * USER SIGN UP AND EMAIL CONFIRMATION METHODS * //
exports.signup = catchAsync(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    dateOfBirth,
    phone,
    // prova
    // role,
  } = req.body;

  // create new user
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    dateOfBirth,
    phone,
    // prova
    // role,
  });

  req.user = newUser;
  // check user email
  next();
});

exports.checkUserEmail = catchAsync(async (req, res, next) => {
  // generate the random reset token
  const resetToken = req.user.createEmailConfirmToken();
  await req.user.save({ validateBeforeSave: false });

  const resetURL = `${req.protocol}://localhost:${process.env.FRONT_END_PORT}/confirmemail/${resetToken}`;

  // * GET THE LINK FROM CONSOLE AT SCHOOL
  console.log(resetURL);

  const message = `Click on this link to confirm your email: ${resetURL}`;

  try {
    // TODO: sendEmail is not working AT SCHOOL find a solution
    // await sendEmail({
    //   email: req.user.email,
    //   subject: "Your email confirmation token (valid for 10 min)",
    //   message,
    // });

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

exports.confirmEmail = catchAsync(async (req, res, next) => {
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

// * USER LOGIN METHODS * //
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  // check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // send response with token
  sendResponseWithToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  // get the token and check if it exists
  let token;
  if (
    req.headers.authorization &&
    // normally, the authorization header is like this: Bearer TOKEN
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // verify the token
  // promisify(jwt.verify) returns a function that returns a promise -> https://it.javascript.info/promisify
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check if the user still exists
  const freshUser = await User.findById(decoded.id);
  if (!freshUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // check if the user changed the password after the token was issued
  if (freshUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  // grant access to the protected route
  req.user = freshUser;

  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles is an array of roles that can access the route
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }

    next();
  };
};

// * PASSWORD RESET METHODS * //
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("There is no user with that email address", 404));
  }

  // generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // send it to user's email
  const resetURL = `${req.protocol}://localhost:${process.env.FRONT_END_PORT}/resetpassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  console.log(resetURL);

  try {
    // TODO: send email doesn't work at school
    // await sendEmail({
    //   email: user.email,
    //   subject: "Your password reset token (valid for 10 min)",
    //   message,
    // });

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

exports.resetPassword = catchAsync(async (req, res, next) => {
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
