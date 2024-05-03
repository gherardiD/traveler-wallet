const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  cityName: {
    type: String,
    required: true,
  },
  country: {
    name: {
      type: String,
      required: true,
    },
    flag: {
      type: String,
      required: true,
    },
  },
  date: {
    type: Date,
    required: true,
  },
  notes: {
    type: String,
  },
  position: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const City = mongoose.model("City", citySchema);

module.exports = City;
