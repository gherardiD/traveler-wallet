const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./utils/errorHandler");

// routers
const userRouter = require("./routes/app/userRoutes");
const currencyRouter = require("./routes/app/currencyRoutes");
const movementRouter = require("./routes/app/movementRoutes");

const APIRouter = require("./routes/api/APIRoutes");

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use("/api/users", userRouter);
app.use("/api/currencies", currencyRouter);
app.use("/api/movements", movementRouter);

app.use("/api/v1", APIRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
