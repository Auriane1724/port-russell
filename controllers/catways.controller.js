/**
 * @file controllers/catways.controller.js
 * @description Contrôleur Catways (API).
 */

const Catway = require("../models/Catway");

/**
 * Récupère la liste de tous les catways.
 * @route GET /api/catways
 * @returns {Promise<void>} JSON { data: Catway[] }
 */
async function listCatways(req, res) {
  const catways = await Catway.find().sort({ catwayNumber: 1 });
  res.json({ data: catways });
}

module.exports = { listCatways };
