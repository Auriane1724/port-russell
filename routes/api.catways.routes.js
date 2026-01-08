/**
 * @file routes/api.catways.routes.js
 * @description Routes API Catways.
 */

const express = require("express");
const { listCatways } = require("../controllers/catways.controller");
const requireAuth = require("../middlewares/requireAuth");

const router = express.Router();

/**
 * Liste des catways (protégé).
 */
/**
 * @openapi
 * /api/catways:
 *   get:
 *     summary: Liste tous les catways
 *     description: Retourne la liste des catways (route protégée, nécessite connexion).
 *     responses:
 *       200:
 *         description: OK
 */

router.get("/catways", requireAuth, listCatways);

module.exports = router;
