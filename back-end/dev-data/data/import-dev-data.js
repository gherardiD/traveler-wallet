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
const City = require("../../models/cityModel");
const Expense = require("../../models/expenseModel");

dotenv.config({ path: `${__dirname}/../../config.env` });

// ? local
// const DB = process.env.DATABASE_LOCAL;

//?  atlas
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => {
  console.log("DB connection successful!");
});

// Read JSON file
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, "utf-8"));

const expenses = JSON.parse(
  fs.readFileSync(`${__dirname}/expenses.json`, "utf-8")
);

const cities = JSON.parse(fs.readFileSync(`${__dirname}/cities.json`, "utf-8"));

// Import data into database
const importData = async () => {
  try {
    await User.create(users, { validateBeforeSave: false });
    await City.create(cities, { validateBeforeSave: false });
    await Expense.create(expenses);
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
    await City.deleteMany();
    await Expense.deleteMany();
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
