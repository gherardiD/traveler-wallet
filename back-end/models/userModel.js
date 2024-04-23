const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please tell us your first name!"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please tell us your last name!"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email!"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  dateOfBirth: {
    type: Date,
    required: [true, "Please provide your date of birth!"],
  },
  phone: {
    type: String,
    required: [true, "Please provide your telephone number!"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password!"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password!"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  emailConfirmToken: String,
  emailConfirmExpires: Date,
  active: {
    type: Boolean,
    default: false,
    select: false,
  },
});

// * DOCUMENT MIDDLEWARES * //
// Encrypt password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  // subtract 1 second to make sure token is created passwordChangedAt (in case of slow connection)
  if (!this.isNew) this.passwordChangedAt = Date.now() - 1000; 
  
  next();
});

// * QUERY MIDDLEWARES * //
// find and findOne
userSchema.pre("find", function (next) {
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

// * INSTANCE METHODS * //
userSchema.methods.isPasswordCorrected = async function (
  candidatePassword, // password that the user enters
  userPassword // password stored in the database (cryptographic hash)
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// check if user changed password after the token was issued
userSchema.methods.userChangedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // false means NOT changed
  return false;
};

userSchema.methods.createEmailConfirmToken = function () {
  const confirmToken = crypto.randomBytes(32).toString("hex");

  // encrypt token
  this.emailConfirmToken = crypto
    .createHash("sha256")
    .update(confirmToken)
    .digest("hex");

  this.emailConfirmExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return confirmToken;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  // encrypt token
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
