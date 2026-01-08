/**
 * @file scripts/seedAdmin.js
 * @description Crée (ou recrée) un compte admin pour accéder au dashboard.
 */

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  const email = "admin@port-russell.test";
  const password = "Admin1234!";

  // supprime l'ancien admin si déjà présent
  await User.deleteOne({ email });

  const passwordHash = await bcrypt.hash(password, 10);
  await User.create({ email, passwordHash, role: "admin" });

  console.log("✅ Admin créé !");
  console.log("Email:", email);
  console.log("Mot de passe:", password);

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error("❌ Seed admin error:", e);
  process.exit(1);
});
