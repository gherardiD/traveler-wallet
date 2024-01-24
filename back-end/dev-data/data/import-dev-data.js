// Desc: Import data into database
//
// Usage: node dev-data/data/import-dev-data.js --import
//
// Usage: node dev-data/data/import-dev-data.js --delete
//

const fs = require("fs");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const User = require("../../models/userModel");
const Currency = require("../../models/currencyModel");
const Movement = require("../../models/movementModel");

dotenv.config({ path: `${__dirname}/../../config.env` });

// ? local
const DB = process.env.DATABASE_LOCAL;

//?  atlas
// const DB = process.env.DATABASE_ATLAS.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );

mongoose.connect(DB).then(() => {
  console.log("DB connection successful!");
});

// Read JSON file
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

const currencies = JSON.parse(
  fs.readFileSync(`${__dirname}/currencies.json`, "utf-8")
);

const movements = JSON.parse(
  fs.readFileSync(`${__dirname}/movements.json`, "utf-8")
);

// Import data into database
const importData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    await Currency.create(currencies);
    await Movement.create(movements, { validateBeforeSave: false });
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete all data from database
const deleteData = async () => {
  try {
    await User.deleteMany();
    await Currency.deleteMany();
    await Movement.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// console.log(process.argv);

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
