/**
 * @file models/User.js
 * @description Modèle User (MongoDB / Mongoose).
 */

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "Admin" },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin"], default: "admin" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
