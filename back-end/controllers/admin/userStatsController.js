const User = require("../../models/userModel");

// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: [true, "Please tell us your first name!"],
//     trim: true,
//   },
//   lastName: {
//     type: String,
//     required: [true, "Please tell us your last name!"],
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: [true, "Please provide your email!"],
//     unique: true,
//     lowercase: true,
//     validate: [validator.isEmail, "Please provide a valid email!"],
//   },
//   dateOfBirth: {
//     type: Date,
//     required: [true, "Please provide your date of birth!"],
//   },
//   phone: {
//     type: String,
//     required: [true, "Please provide your telephone number!"],
//     trim: true,
//   },
//   password: {
//     type: String,
//     required: [true, "Please provide a password!"],
//     minlength: 8,
//     select: false,
//   },
//   passwordConfirm: {
//     type: String,
//     required: [true, "Please confirm your password!"],
//     validate: {
//       // This only works on CREATE and SAVE!!!
//       validator: function (el) {
//         return el === this.password;
//       },
//       message: "Passwords are not the same!",
//     },
//   },
//   role: {
//     type: String,
//     enum: ["user", "admin"],
//     default: "user",
//   },
//   passwordChangedAt: Date,
//   passwordResetToken: String,
//   passwordResetExpires: Date,
//   emailConfirmToken: String,
//   emailConfirmExpires: Date,
//   active: {
//     type: Boolean,
//     default: false,
//     select: false,
//   },
// });

  