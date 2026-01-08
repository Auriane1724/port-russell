/**
 * @file models/Reservation.js
 * @description Modèle Reservation (réservation d'un catway).
 */

const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    catwayNumber: { type: Number, required: true }, // numéro du catway
    clientName: { type: String, required: true },
    boatName: { type: String, required: true },

    // ✅ NOMS CONFORMES AU JSON : startDate / endDate
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reservation", reservationSchema);
