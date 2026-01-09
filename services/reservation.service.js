/**
 * @file services/reservation.service.js
 * @description Couche service pour les opérations Reservation + règles métier.
 */

const Reservation = require("../models/Reservation");
const Catway = require("../models/Catway");

/**
 * Vérifie si deux périodes se chevauchent.
 */
function overlap(aStart, aEnd, bStart, bEnd) {
  return aStart < bEnd && bStart < aEnd;
}

/**
 * Liste toutes les réservations.
 */
async function list() {
  return Reservation.find().sort({ startDate: 1 });
}

/**
 * Liste les réservations d'un catway (via id Mongo).
 */
async function listByCatwayId(catwayId) {
  const catway = await Catway.findById(catwayId);
  if (!catway) {
    const err = new Error("Catway introuvable");
    err.status = 404;
    throw err;
  }

  return Reservation.find({ catwayNumber: catway.catwayNumber }).sort({
    startDate: 1,
  });
}

/**
 * Récupère une réservation par id.
 */
async function getById(id) {
  return Reservation.findById(id);
}

/**
 * Crée une réservation avec règles métier.
 */
async function create(data) {
  const start = new Date(data.startDate);
  const end = new Date(data.endDate);

  // règle 1 : start < end
  if (!(start < end)) {
    const err = new Error("startDate doit être antérieure à endDate");
    err.status = 400;
    throw err;
  }

  // règle 2 : catway existant
  const catway = await Catway.findOne({ catwayNumber: data.catwayNumber });
  if (!catway) {
    const err = new Error("Catway invalide");
    err.status = 400;
    throw err;
  }

  // règle 3 : pas de chevauchement
  const existing = await Reservation.find({ catwayNumber: data.catwayNumber });
  for (const r of existing) {
    if (overlap(start, end, new Date(r.startDate), new Date(r.endDate))) {
      const err = new Error("Chevauchement de réservation");
      err.status = 409;
      throw err;
    }
  }

  return Reservation.create({
    catwayNumber: data.catwayNumber,
    clientName: data.clientName,
    boatName: data.boatName,
    startDate: start,
    endDate: end,
  });
}

/**
 * Met à jour une réservation avec règles métier.
 */
async function update(id, data) {
  const current = await Reservation.findById(id);
  if (!current) return null;

  const start = data.startDate
    ? new Date(data.startDate)
    : new Date(current.startDate);
  const end = data.endDate ? new Date(data.endDate) : new Date(current.endDate);
  const catwayNumber = data.catwayNumber ?? current.catwayNumber;

  if (!(start < end)) {
    const err = new Error("startDate doit être antérieure à endDate");
    err.status = 400;
    throw err;
  }

  const existing = await Reservation.find({
    catwayNumber,
    _id: { $ne: id },
  });

  for (const r of existing) {
    if (overlap(start, end, new Date(r.startDate), new Date(r.endDate))) {
      const err = new Error("Chevauchement de réservation");
      err.status = 409;
      throw err;
    }
  }

  return Reservation.findByIdAndUpdate(
    id,
    { ...data, startDate: start, endDate: end, catwayNumber },
    { new: true, runValidators: true }
  );
}

/**
 * Supprime une réservation.
 */
async function remove(id) {
  return Reservation.findByIdAndDelete(id);
}

module.exports = {
  list,
  listByCatwayId,
  getById,
  create,
  update,
  remove,
};
