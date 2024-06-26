const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    required: [true, "Please tell us the expense type!"],
    enum: {
      values: ["food", "transport", "accommodation", "leisure", "other"],
      message: 'Type is either: food, transport, accommodation, leisure or other!',
    },
  },
  amount: {
    type: Number,
    required: [true, "Please tell us the expense amount!"],
    min: [0, "Amount must be greater than 0!"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please tell us the expense user!"],
  },
  city: {
    type: mongoose.Schema.ObjectId,
    ref: "City",
    required: [true, "Please tell us the city!"],
  },
  date: {
    type: Date,
    required: [true, "Please tell us the expense date!"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

// * INDEXES * //
expenseSchema.index({ user: 1, createdAt: -1 });
expenseSchema.index({ user: 1, amount: 1 });
expenseSchema.index({ user: 1, city: 1 });

// * PRE MIDDLEWARE * //
expenseSchema.pre(/^find/, function (next) {
  this.populate({
    path: "city",
    select: "-__v -user",
  });
  next();
});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
