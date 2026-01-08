/**
 * @file controllers/catways.controller.js
 * @description Contrôleur Catways (API).
 */

const catwayService = require("../services/catway.service");

/**
 * Récupère la liste de tous les catways.
 * @route GET /api/catways
 */
async function listCatways(req, res) {
  const catways = await catwayService.list();
  return res.status(200).json({ data: catways });
}

module.exports = { listCatways };
