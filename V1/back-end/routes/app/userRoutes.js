const express = require("express");

// AUTH
const signup = require("../../controllers/auth/signUp");
const checkUserEmail = require("../../controllers/auth/checkUserEmail");
const confirmEmail = require("../../controllers/auth/confirmEmail");
const login = require("../../controllers/auth/login");
const protect = require("../../controllers/auth/protect");
const restrictTo = require("../../controllers/auth/restrictTo");
const forgotPassword = require("../../controllers/auth/forgotPassword");
const resetPassword = require("../../controllers/auth/resetPassword");
const updatePassword = require("../../controllers/auth/updatePassword");

// USER
const getMe = require("../../controllers/user/current/getMe");
const updateMe = require("../../controllers/user/current/updateMe");
const deleteMe = require("../../controllers/user/current/deleteMe");
const getAllUsers = require("../../controllers/user/every/getAllUsers");
const getUser = require("../../controllers/user/every/getUser");
const createUser = require("../../controllers/user/every/createUser");
const updateUser = require("../../controllers/user/every/updateUser");
const deleteUser = require("../../controllers/user/every/deleteUser");

const router = express.Router();

router.post("/signup", signup, checkUserEmail);
router.get("/confirm-email/:token", confirmEmail);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.patch("/reset-password/:token", resetPassword);

router.use(protect);

router.patch("/update-password", updatePassword);
router.get("/me", getMe);
router.patch("/update-me", updateMe);
router.delete("/delete-me", deleteMe);

// router.use(restrictTo("admin"));

// router.route("/").get(getAllUsers).post(createUser);
// router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);
module.exports = router;
