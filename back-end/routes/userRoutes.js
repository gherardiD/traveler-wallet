const express = require("express");

const {
  getMe,
  updateMe,
  deleteMe,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController.js");

const {
  signup,
  checkUserEmail,
  confirmEmail,
  login,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("../controllers/authController.js");

const router = express.Router();

router.post("/signup", signup, checkUserEmail);
router.get("/confirm-email/:token", confirmEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

router.use(protect);

router.patch("/update-password", updatePassword);
router.get("/me", getMe, getUser);
router.patch("/update-me", updateMe);
router.delete("/delete-me", deleteMe);

router.use(restrictTo("admin"));

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = router;
