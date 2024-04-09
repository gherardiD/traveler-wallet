const express = require("express");

const getAllMovements = require("../../controllers/movement/every/getAllMovements");
const getMovement = require("../../controllers/movement/every/getMovement");
const createMovement = require("../../controllers/movement/every/createMovement");
const updateMovement = require("../../controllers/movement/every/updateMovement");
const deleteMovement = require("../../controllers/movement/every/deleteMovement");


const router = express.Router({ mergeParams: true});

router.route("/").get(getAllMovements).post(createMovement);

router
  .route("/:id")
  .get(getMovement)
  .patch(updateMovement)
  .delete(deleteMovement);

module.exports = router;
