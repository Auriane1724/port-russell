/**
 * @file routes/api.catways.routes.js
 * @description Routes API Catways (CRUD).
 */

const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const asyncHandler = require("../middlewares/asyncHandler");
const c = require("../controllers/catways.controller");

const router = express.Router();

router.get("/catways", requireAuth, asyncHandler(c.listCatways));
router.get("/catways/:id", requireAuth, asyncHandler(c.getCatway));
router.post("/catways", requireAuth, asyncHandler(c.createCatway));
router.put("/catways/:id", requireAuth, asyncHandler(c.updateCatway));
router.delete("/catways/:id", requireAuth, asyncHandler(c.deleteCatway));

module.exports = router;
