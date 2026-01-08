/**
 * @file controllers/reservations.controller.js
 * @description Contrôleur Reservations (API).
 */

const Reservation = require("../models/Reservation");

/**
 * Récupère la liste de toutes les réservations.
 * @route GET /api/reservations
 * @returns {Promise<void>} JSON { data: Reservation[] }
 */
async function listReservations(req, res) {
  const reservations = await Reservation.find().sort({ startDate: 1 });
  res.json({ data: reservations });
}

module.exports = { listReservations };
