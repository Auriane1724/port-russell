/**
 * @file routes/api.reservations.routes.js
 * @description Routes API Reservations.
 */

const express = require("express");
const { listReservations } = require("../controllers/reservations.controller");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

/**
 * Liste des réservations (protégé).
 */
/**
 * @openapi
 * /api/reservations:
 *   get:
 *     summary: Liste toutes les réservations
 *     description: Retourne la liste des réservations (route protégée, nécessite connexion).
 *     responses:
 *       200:
 *         description: OK
 */

router.get("/reservations", requireAuth, listReservations);

module.exports = router;
