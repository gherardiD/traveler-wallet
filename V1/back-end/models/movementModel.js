const mongoose = require("mongoose");

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
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please tell us the movement user!"],
  },
  currency: {
    type: mongoose.Schema.ObjectId,
    ref: "Currency",
    required: [true, "Please tell us the movement currency!"],
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

// * INDEXES * //
movementSchema.index({ user: 1, createdAt: -1 });
movementSchema.index({ user: 1, amount: 1 });

// * PRE MIDDLEWARE * //
movementSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "-__v",
  });
  next();
});

const Movement = mongoose.model("Movement", movementSchema);

module.exports = Movement;
