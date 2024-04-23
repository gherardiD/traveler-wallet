const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const sendResponseWithToken = require("../../utils/sendResponseWithToken");
const User = require("../../models/userModel");

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.isPasswordCorrected(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  sendResponseWithToken(user, 200, res);
});

module.exports = login;
