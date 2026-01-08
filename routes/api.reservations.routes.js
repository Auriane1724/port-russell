/**
 * @file routes/api.reservations.routes.js
 * @description Routes API Reservations (CRUD + sous-ressource).
 */

const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const asyncHandler = require("../middlewares/asyncHandler");
const r = require("../controllers/reservations.controller");

const router = express.Router();

router.get("/reservations", requireAuth, asyncHandler(r.listReservations));
router.get("/reservations/:id", requireAuth, asyncHandler(r.getReservation));
router.post("/reservations", requireAuth, asyncHandler(r.createReservation));
router.put("/reservations/:id", requireAuth, asyncHandler(r.updateReservation));
router.delete(
  "/reservations/:id",
  requireAuth,
  asyncHandler(r.deleteReservation)
);
router.get(
  "/catways/:id/reservations",
  requireAuth,
  asyncHandler(r.listReservationsByCatway)
);

module.exports = router;
