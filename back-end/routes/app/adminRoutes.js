const express = require('express');

const protect = require("../../controllers/auth/protect");
const restrictTo = require("../../controllers/auth/restrictTo");

const getAllUsers = require("../../controllers/user/every/getAllUsers");
const getUser = require("../../controllers/user/every/getUser");
const deleteUser = require("../../controllers/user/every/deleteUser");

const getAllExpenses = require("../../controllers/expense/every/getAllExpenses");
const getExpense = require("../../controllers/expense/every/getExpense");
const deleteExpense = require("../../controllers/expense/every/deleteExpense");

const getAllCities = require("../../controllers/city/every/getAllCities");
const getCity = require("../../controllers/city/every/getCity");
const createCity = require("../../controllers/city/every/createCity");
const updateCity = require("../../controllers/city/every/updateCity");
const deleteCity = require("../../controllers/city/every/deleteCity");

const router = express.Router();

router.use(protect);
router.use(restrictTo("admin"));

router.route("/users").get(getAllUsers)
router.route("/users/:id").get(getUser).delete(deleteUser);

router.route("/expenses").get(getAllExpenses);
router.route("/expenses/:id").get(getExpense).delete(deleteExpense);

router.route("/cities").get(getAllCities).post(createCity);
router.route("/cities/:id").get(getCity).patch(updateCity).delete(deleteCity);

module.exports = router;