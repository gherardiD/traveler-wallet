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

const router = express.Router();

// user routes
router.post("/signup", signup, checkUserEmail);
router.get("/confirmemail/:token", confirmEmail);

router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.patch("/resetpassword/:token", resetPassword);

// admin routes
router.route("/").get(getAllUsers).post(createUser);
router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
