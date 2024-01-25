const express = require("express");

const {
  getAllMovements,
  getMovement,
  createMovement,
  updateMovement,
  deleteMovement,
} = require("../controllers/movementController.js");

const { protect } = require("../controllers/authController.js");

const router = express.Router();

router
  .route("/")
  .get(protect, getAllMovements)
  .post(protect, createMovement);

  // TODO: IMPLEMENT ALL ROUTES
  // router.route("/expenses").get(protect, getAllMovements);
  // router.route("/incomes").get(protect, getAllMovements);
  // router.route("/expensiest-movements").get(protect, getAllMovements);
  // router.route("/cheapest-movements").get(protect, getAllMovements);

  // movements specific month
  // router.route("/year/:year").get(protect, getAllMovements);

router
  .route("/:id")
  .get(protect, getMovement)
  .patch(protect, updateMovement)
  .delete(protect, deleteMovement);

module.exports = router;
