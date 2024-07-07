const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    resetPasswordOTP: String, // Field to store the OTP
    resetPasswordExpiration: Date, // Field to store the OTP expiration time
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("users", userSchema);
module.exports = User;
