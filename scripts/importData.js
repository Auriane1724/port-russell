/**
 * @file scripts/importData.js
 * @description Importe catways.json et reservations.json dans MongoDB.
 */

require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

const Catway = require("../models/Catway");
const Reservation = require("../models/Reservation");

function readJson(fileName) {
  const filePath = path.join(__dirname, "..", fileName);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI);

  const catways = readJson("catways.json");
  const reservations = readJson("reservations.json");

  // Nettoyage
  await Catway.deleteMany({});
  await Reservation.deleteMany({});

  // Insertion
  await Catway.insertMany(catways);
  await Reservation.insertMany(
    reservations.map((r) => ({
      catwayNumber: r.catwayNumber,
      clientName: r.clientName,
      boatName: r.boatName,
      startDate: new Date(r.startDate),
      endDate: new Date(r.endDate),
    }))
  );

  console.log(
    `✅ Import OK: ${catways.length} catways, ${reservations.length} reservations`
  );

  await mongoose.disconnect();
}

main().catch((e) => {
  console.error("❌ Import error:", e);
  process.exit(1);
});
