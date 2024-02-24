const express = require("express");

const {
  setUserId,
  getAllMovements,
  getMovement,
  createMovement,
  updateMovement,
  deleteMovement,
} = require("../controllers/movementController.js");

const { protect, restrictTo } = require("../controllers/authController.js");

const router = express.Router();

// * Protect all routes after this middleware
router.use(protect);

router.route("/").get(setUserId, getAllMovements).post(createMovement);

// TODO: IMPLEMENT ALL ROUTES
// router.route("/expenses").get( getAllMovements);
// router.route("/incomes").get( getAllMovements);
// router.route("/expensiest-movements").get( getAllMovements);
// router.route("/cheapest-movements").get( getAllMovements);

// movements specific month
// router.route("/year/:year").get( getAllMovements);

router
  .route("/:id")
  .get(getMovement)
  .patch(updateMovement)
  .delete(deleteMovement);

// * Protect all routes after this middleware
// router.use(restrictTo("admin"));

router.route("/").get(getAllMovements);
router.route("/:id").delete(deleteMovement);

module.exports = router;
