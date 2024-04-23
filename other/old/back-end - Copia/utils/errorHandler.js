const AppError = require("./appError");

// create functions to handle operational errors

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;

  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
  const message = `Duplicate field value: ${err.keyValue.name}. Please use another value!`;

  return new AppError(message, 400);
};

const handleJWTError = () => {
  const message = "Invalid token. Please log in again!";

  return new AppError(message, 401);
};

const handleJWTExpiredError = () => {
  const message = "Your token has expired! Please log in again!";

  return new AppError(message, 401);
};

// create function to send errors to the client in development
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

// create function to send errors to the client in production
const sendErrorProd = (err, res) => {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // programming or other unknown error: don't leak error details
  } else {
    // Send generic message
    res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }
};

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  // console.log(err);
  err.statusCode = err.statusCode || 500; // 500 internal server error
  err.status = err.status || "error"; // error or fail
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // ! FIND A WAY TO COPY EVERY VALUES OF THE ERR OBJECT ! \\
    let error = err;
    if (err.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    if (err.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }
    if (err.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    if (err.name === "JsonWebTokenError") {
      error = handleJWTError(error);
    }
    if (err.name === "TokenExpiredError") {
      error = handleJWTExpiredError(error);
    }
    sendErrorProd(error, res);
  }
};
