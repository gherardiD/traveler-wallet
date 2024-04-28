const jwt = require("jsonwebtoken");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const sendResponseWithToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // set cookie options
  // const cookieOptions = {
  //   expires: new Date(
  //     Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
  //   ),
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  // };


  // remove password from output
  user.password = undefined;
  // user.active = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    user,
  });
};

module.exports = sendResponseWithToken;
