const express = require("express");

const nestedExpenseRouter = require("./nestedExpenseRoutes");

// CITY
const getAllMyCities = require("../../controllers/city/current/getAllMyCities");
const getMyCity = require("../../controllers/city/current/getMyCity");
const createMyCity = require("../../controllers/city/current/createMyCity");
const updateMyCity = require("../../controllers/city/current/updateMyCity");
const deleteMyCity = require("../../controllers/city/current/deleteMyCity");

// AUTH
const protect = require("../../controllers/auth/protect");

const router = express.Router();

router.use(protect);

router.use("/:cityId/expenses", nestedExpenseRouter);

router.route("/").get(getAllMyCities).post(createMyCity);
router.route("/:id").get(getMyCity).patch(updateMyCity).delete(deleteMyCity);

module.exports = router;
