/**
 * @file config/db.js
 * @description Connexion MongoDB via Mongoose.
 */

const mongoose = require("mongoose");

/**
 * Connecte l'application à MongoDB.
 * @param {string} uri - URI MongoDB
 * @returns {Promise<void>}
 */
async function connectDB(uri) {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = { connectDB };
