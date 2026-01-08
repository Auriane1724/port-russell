/**
 * @file controllers/reservations.controller.js
 * @description Contrôleur Reservations (API CRUD + sous-ressource).
 */

const reservationService = require("../services/reservation.service");

/**
 * GET /api/reservations
 */
async function listReservations(req, res) {
  const data = await reservationService.list();
  return res.status(200).json({ data });
}

/**
 * GET /api/reservations/:id
 */
async function getReservation(req, res) {
  const item = await reservationService.getById(req.params.id);
  if (!item) return res.status(404).json({ error: "Réservation introuvable" });
  return res.status(200).json({ data: item });
}

/**
 * POST /api/reservations
 */
async function createReservation(req, res) {
  const created = await reservationService.create(req.body);
  return res.status(201).json({ data: created });
}

/**
 * PUT /api/reservations/:id
 */
async function updateReservation(req, res) {
  const updated = await reservationService.update(req.params.id, req.body);
  if (!updated)
    return res.status(404).json({ error: "Réservation introuvable" });
  return res.status(200).json({ data: updated });
}

/**
 * DELETE /api/reservations/:id
 */
async function deleteReservation(req, res) {
  const deleted = await reservationService.remove(req.params.id);
  if (!deleted)
    return res.status(404).json({ error: "Réservation introuvable" });
  return res.status(204).send();
}

/**
 * GET /api/catways/:id/reservations
 */
async function listReservationsByCatway(req, res) {
  const data = await reservationService.listByCatwayId(req.params.id);
  return res.status(200).json({ data });
}

module.exports = {
  listReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
  listReservationsByCatway,
};
