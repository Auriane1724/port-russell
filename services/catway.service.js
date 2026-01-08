/**
 * @file services/catway.service.js
 * @description Couche service pour les opérations Catway (CRUD).
 */

const Catway = require("../models/Catway");

/**
 * Liste tous les catways.
 * @returns {Promise<Array>} liste des catways
 */
async function list() {
  return Catway.find().sort({ catwayNumber: 1 });
}

module.exports = { list };
