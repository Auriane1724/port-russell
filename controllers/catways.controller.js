/**
 * @file controllers/catways.controller.js
 * @description Contrôleur Catways (API CRUD).
 */

const catwayService = require("../services/catway.service");

/**
 * GET /api/catways
 */
async function listCatways(req, res) {
  const data = await catwayService.list();
  return res.status(200).json({ data });
}

/**
 * GET /api/catways/:id
 */
async function getCatway(req, res) {
  const item = await catwayService.getById(req.params.id);
  if (!item) return res.status(404).json({ error: "Catway introuvable" });
  return res.status(200).json({ data: item });
}

/**
 * POST /api/catways
 */
async function createCatway(req, res) {
  const created = await catwayService.create(req.body);
  return res.status(201).json({ data: created });
}

/**
 * PUT /api/catways/:id
 */
async function updateCatway(req, res) {
  const updated = await catwayService.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: "Catway introuvable" });
  return res.status(200).json({ data: updated });
}

/**
 * DELETE /api/catways/:id
 */
async function deleteCatway(req, res) {
  const deleted = await catwayService.remove(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Catway introuvable" });
  return res.status(204).send();
}

module.exports = {
  listCatways,
  getCatway,
  createCatway,
  updateCatway,
  deleteCatway,
};
