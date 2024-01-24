const mongoose = require("mongoose");
// const currencyExample = {
//   id: 1,
//   name: 'Euro',
//   cod: 'EUR',
//   symbol: '€',
// }


const currencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us the currency name!"],
    trim: true,
  },
  code: {
    type: String,
    required: [true, "Please tell us the currency code!"],
    trim: true,
  },
  symbol: {
    type: String,
    required: [true, "Please tell us the currency symbol!"],
    trim: true,
  },
});

const Currency = mongoose.model("Currency", currencySchema);

module.exports = Currency;
