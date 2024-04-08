const express = require("express");

// USER
const getAllMyMovements = require("../../controllers/movement/current/getAllMyMovements");
const getMyMovement = require("../../controllers/movement/current/getMyMovement");
const createMyMovement = require("../../controllers/movement/current/createMyMovement");
const updateMyMovement = require("../../controllers/movement/current/updateMyMovement");
const deleteMyMovement = require("../../controllers/movement/current/deleteMyMovement");

// ADMIN
const getAllMovements = require("../../controllers/movement/every/getAllMovements");
const getMovement = require("../../controllers/movement/every/getMovement");
const createMovement = require("../../controllers/movement/every/createMovement");
const updateMovement = require("../../controllers/movement/every/updateMovement");
const deleteMovement = require("../../controllers/movement/every/deleteMovement");

// AUTH
const protect = require("../../controllers/auth/protect");
const restrictTo = require("../../controllers/auth/restrictTo");


const router = express.Router();

router.use(protect);

router.route("/").get(getAllMyMovements).post(createMyMovement);

router
  .route("/:id")
  .get(getMyMovement)
  .patch(updateMyMovement)
  .delete(deleteMyMovement);

router.use(restrictTo("admin"));

router.route("/admin").get(getAllMovements).post(createMovement);

router
  .route("/:id")
  .get(getMovement)
  .patch(updateMovement)
  .delete(deleteMovement);



// TODO: IMPLEMENT ALL ROUTES
// router.route("/expenses").get( getAllMovements);
// router.route("/incomes").get( getAllMovements);
// router.route("/expensiest-movements").get( getAllMovements);
// router.route("/cheapest-movements").get( getAllMovements);

// movements specific month
// router.route("/year/:year").get( getAllMovements);


module.exports = router;
