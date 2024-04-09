const User = require("../../../models/userModel");
const AppError = require("../../../utils/appError");
const catchAsync = require("../../../utils/catchAsync");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};

  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });

  return newObj;
};

const updateMe = catchAsync(async (req, res, next) => {
  // create an error if the user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /update-password",
        400
      )
    );
  }

  // filter out unwanted fields, only allow name and email to be updated
  const filteredBody = filterObj(req.body, "name", "email");

  // update the user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  // send the response
  res.status(200).json({
    status: "success",
    data: { user: updatedUser },
  });
});

module.exports = updateMe;