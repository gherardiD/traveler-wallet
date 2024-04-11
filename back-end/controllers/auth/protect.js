const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { promisify } = require("util");
const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");

const protect = catchAsync(async (req, res, next) => {
  /*
  // get the token from headers
  let token;
  if (
    req.headers.authorization &&
    // normally, the authorization header is like this: Bearer TOKEN
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
*/
  // TODO with cookies
  const token = req.cookies.jwt;
  console.log(req.cookies)

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // verify the token
  // promisify(jwt.verify) returns a function that returns a promise -> https://it.javascript.info/promisify
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

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
  if (freshUser.userChangedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  req.user = freshUser;
  next();
});

module.exports = protect;
