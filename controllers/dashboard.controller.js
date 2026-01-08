/**
 * @file controllers/dashboard.controller.js
 * @description Contrôleur Dashboard (pages EJS).
 */

const Catway = require("../models/Catway");
const Reservation = require("../models/Reservation");

/**
 * Affiche le tableau de bord (catways + reservations).
 * @route GET /dashboard
 */
async function renderDashboard(req, res) {
  const catways = await Catway.find().sort({ catwayNumber: 1 });
  const reservations = await Reservation.find().sort({ startDate: 1 });

  res.render("dashboard", {
    title: "Dashboard - Port Russell",
    userId: req.user.sub,
    catways,
    reservations,
  });
}

module.exports = { renderDashboard };
