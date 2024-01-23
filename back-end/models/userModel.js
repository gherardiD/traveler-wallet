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
    // default: "user",
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
  // only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  // hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // delete the passwordConfirm field
  this.passwordConfirm = undefined;

  // if the document isn't new, set passwordChangedAt to current time
  if (!this.isNew) this.passwordChangedAt = Date.now() - 1000; // subtract 1 second to make sure token is created after passwordChangedAt (in case of slow connection
  next();
});

// * QUERY MIDDLEWARES * //
// ! this is why the confirmEmail route doesn't work
userSchema.pre(/^find/, function (next) {
  const query = this.getQuery();
  const inactiveUser = query.inactiverUser;
  // this points to the current query
  this.find({ active: { $ne: false } });
  next();
});

// * INSTANCE METHODS * //
userSchema.methods.comparePassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// check if user changed password after the token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    ); // 10 is radix parameter

    return JWTTimestamp < changedTimestamp;
  }

  // false means NOT changed
  return false;
};

userSchema.methods.createEmailConfirmToken = function () {
  // create random token
  const confirmToken = crypto.randomBytes(32).toString("hex");

  // encrypt token
  this.emailConfirmToken = crypto
    .createHash("sha256")
    .update(confirmToken)
    .digest("hex");

  // set token expiration time
  this.emailConfirmExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return confirmToken;
};

userSchema.methods.createPasswordResetToken = function () {
  // create random token
  const resetToken = crypto.randomBytes(32).toString("hex");

  // encrypt token
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // set token expiration time
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
