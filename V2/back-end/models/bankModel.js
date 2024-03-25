const mongoose = require("mongoose");

const bankSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us the bank name!"],
    trim: true,
  },
});

const Bank = mongoose.model("Bank", bankSchema);

module.exports = Bank;
