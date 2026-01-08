/**
 * @file routes/api.reservations.routes.js
 * @description Routes API Reservations (CRUD + sous-ressource).
 */

const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const asyncHandler = require("../middlewares/asyncHandler");
const r = require("../controllers/reservations.controller");

const router = express.Router();
/**
 * @openapi
 * /api/reservations:
 *   get:
 *     summary: Liste des réservations
 *     tags: [Reservations]
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     summary: Créer une réservation
 *     tags: [Reservations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [catwayNumber, clientName, boatName, startDate, endDate]
 *             properties:
 *               catwayNumber:
 *                 type: number
 *               clientName:
 *                 type: string
 *               boatName:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Créé
 *       400:
 *         description: Dates invalides / Catway invalide
 *       409:
 *         description: Chevauchement de réservation
 *
 * /api/reservations/{id}:
 *   get:
 *     summary: Détail d'une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Introuvable
 *   put:
 *     summary: Mettre à jour une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               catwayNumber:
 *                 type: number
 *               clientName:
 *                 type: string
 *               boatName:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Dates invalides / Catway invalide
 *       409:
 *         description: Chevauchement de réservation
 *       404:
 *         description: Introuvable
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Supprimé
 *       404:
 *         description: Introuvable
 *
 * /api/catways/{id}/reservations:
 *   get:
 *     summary: Réservations d'un catway (par id Mongo du catway)
 *     tags: [Reservations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Catway introuvable
 */

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
