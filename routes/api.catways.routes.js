/**
 * @file routes/api.catways.routes.js
 * @description Routes API Catways (CRUD).
 */

const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const asyncHandler = require("../middlewares/asyncHandler");
const c = require("../controllers/catways.controller");

const router = express.Router();
/**
 * @openapi
 * /api/catways:
 *   get:
 *     summary: Liste des catways
 *     tags: [Catways]
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     summary: Créer un catway
 *     tags: [Catways]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [catwayNumber, catwayType, catwayState]
 *             properties:
 *               catwayNumber:
 *                 type: number
 *               catwayType:
 *                 type: string
 *                 enum: [short, long]
 *               catwayState:
 *                 type: string
 *     responses:
 *       201:
 *         description: Créé
 *
 * /api/catways/{id}:
 *   get:
 *     summary: Détail d'un catway
 *     tags: [Catways]
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
 *     summary: Mettre à jour un catway
 *     tags: [Catways]
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
 *               catwayType:
 *                 type: string
 *                 enum: [short, long]
 *               catwayState:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Introuvable
 *   delete:
 *     summary: Supprimer un catway
 *     tags: [Catways]
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
 */

router.get("/catways", requireAuth, asyncHandler(c.listCatways));
router.get("/catways/:id", requireAuth, asyncHandler(c.getCatway));
router.post("/catways", requireAuth, asyncHandler(c.createCatway));
router.put("/catways/:id", requireAuth, asyncHandler(c.updateCatway));
router.delete("/catways/:id", requireAuth, asyncHandler(c.deleteCatway));

module.exports = router;
