const express = require("express");

const {
  getAllMovements,
  getMovement,
  createMovement,
  updateMovement,
  deleteMovement,
} = require("../controllers/movementController.js");


const router = express.Router({ mergeParams: true});

router.route("/").get(getAllMovements).post(createMovement);

router
  .route("/:id")
  .get(getMovement)
  .patch(updateMovement)
  .delete(deleteMovement);

module.exports = router;
