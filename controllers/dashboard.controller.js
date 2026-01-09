/**
 * @file controllers/dashboard.controller.js
 * @description Dashboard (EJS).
 */

const Reservation = require("../models/Reservation");

async function renderDashboard(req, res) {
  const today = new Date();

  const currentReservations = await Reservation.find({
    startDate: { $lte: today },
    endDate: { $gte: today },
  }).sort({ startDate: 1 });

  return res.render("dashboard", {
    title: "Dashboard - Port Russell",
    user: req.user,
    today,
    currentReservations,
  });
}

module.exports = { renderDashboard };
