const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./utils/errorHandler");

// routers
const userRouter = require("./routes/app/userRoutes");
const cityRouter = require("./routes/app/cityRoutes");
const expenseRouter = require("./routes/app/expenseRoutes");
const adminRoutes = require("./routes/app/adminRoutes");
const APIRouter = require("./routes/api/APIRoutes");

const app = express();

app.use(cors());

// Set security HTTP headers
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

app.use("/api/users", userRouter);
app.use("/api/cities", cityRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/admin", adminRoutes);

app.use("/api/v1", APIRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
