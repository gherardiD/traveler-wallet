const express = require("express");

const {
  setUserId,
  addUserIdIntoBodyReq,
  getAllMovements,
  getMovement,
  createMovement,
  updateMovement,
  deleteMovement,
} = require("../controllers/movementController.js");

const { protect, restrictTo } = require("../controllers/authController.js");

const router = express.Router();

router.use(protect);

router.route("/").get(setUserId, getAllMovements).post(addUserIdIntoBodyReq, createMovement);

router
  .route("/:id")
  .get(getMovement)
  .patch(updateMovement)
  .delete(deleteMovement);

router.use(restrictTo("admin"));

router.route("/admin").get(getAllMovements).post(createMovement);



// TODO: IMPLEMENT ALL ROUTES
// router.route("/expenses").get( getAllMovements);
// router.route("/incomes").get( getAllMovements);
// router.route("/expensiest-movements").get( getAllMovements);
// router.route("/cheapest-movements").get( getAllMovements);

// movements specific month
// router.route("/year/:year").get( getAllMovements);


module.exports = router;
