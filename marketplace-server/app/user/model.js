const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const UserSchema = new Schema(
  {
    us_name: {
      type: String,
      minLength: [3, "User name must be at least 3 characters long"],
      maxLength: [50, "User name must not exceed 50 characters"],
      required: [true, "User name must be filled"],
    },
    us_password: {
      type: String,
      minLength: [6, "Password must be at least 6 characters long"],
      required: [true, "Password must be filled"],
    },
    us_email: {
      type: String,
      required: [true, "Email must be filled"],
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    us_phone_number: {
      type: String,
      required: [true, "Phone number must be filled"],
      match: [/^\d+$/, "Phone number must contain only digits"],
    },
    us_address: {
      type: String,
      minLength: [5, "Address must be at least 5 characters long"],
      maxLength: [100, "Address must not exceed 100 characters"],
      required: [true, "Address must be filled"],
    },
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
