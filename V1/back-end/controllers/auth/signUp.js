const catchAsync = require("../../utils/catchAsync");
const User = require("../../models/userModel");

const signUp = catchAsync(async (req, res, next) => {
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

module.exports = signUp;
