const mongoose = require("mongoose");
// const movementExample = [{
//   name: "Salary",
//   description: "Monthly salary",
//   type: "Income",
//   amount: 1000,
//   sign: "+",
//   user: "65b0fc7da429692516eb0cc4",
//   currency: "5f8b2a6f4d4c8d2c7c4b1d0f",
//   date: "2020-10-17",
// },
// {
//   name: "Rent",
//   description: "Monthly rent",
//   type: "Expense",
//   amount: 500,
//   sign: "-",
//   user: "65b0fc7da429692516eb0cc4",
//   currency: "5f8b2a6f4d4c8d2c7c4b1d0f",
//   date: "2020-10-17",
// },
// ];

const movementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us the movement name!"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    required: [true, "Please tell us the movement type!"],
    trim: true,
  },
  amount: {
    type: Number,
    required: [true, "Please tell us the movement amount!"],
    trim: true,
  },
  sign: {
    type: String,
    enum: ["+", "-"],
    required: [true, "Please tell us the movement sign!"],
    trim: true,
  },
  user: {
    // ! prova
    type: String,
    // type: mongoose.Schema.ObjectId,
    // ref: "User",
    required: [true, "Please tell us the movement user!"],
    trim: true,
  },
  currency: {
    // ! prova
    // type: mongoose.Schema.ObjectId,
    type: String,
    // ref: "Currency",
    required: [true, "Please tell us the movement currency!"],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, "Please tell us the movement date!"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

const Movement = mongoose.model("Movement", movementSchema);

module.exports = Movement;
