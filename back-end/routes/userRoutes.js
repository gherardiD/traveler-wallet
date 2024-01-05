const express = require("express");

const {
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
  forgotPassword,
  resetPassword,
} = require("../controllers/authController.js");

// currencies controller methods
const router = express.Router();

router.post("/signup", signup, checkUserEmail);
router.get("/confirmEmail/:token", confirmEmail);
router.post("/login", login);
router.post("/forgotPassword", forgotPassword);
router.patch("/resetPassword/:token", resetPassword);

router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
