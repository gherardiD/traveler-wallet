const express = require("express");
const morgan = require("morgan");

const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorHandler");

const userRouter = require("./routes/userRoutes");
const currencyRouter = require("./routes/currencyRoutes");

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use("/api/users", userRouter);
app.use("/api/currencies", currencyRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
