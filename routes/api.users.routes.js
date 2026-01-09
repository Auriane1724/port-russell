/**
 * @file routes/api.users.routes.js
 * @description Routes API Users (CRUD).
 */

const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const asyncHandler = require("../middlewares/asyncHandler");
const u = require("../controllers/users.controller");

const router = express.Router();

router.get("/users", requireAuth, asyncHandler(u.listUsers));
router.get("/users/:id", requireAuth, asyncHandler(u.getUser));
router.post("/users", requireAuth, asyncHandler(u.createUser));
router.put("/users/:id", requireAuth, asyncHandler(u.updateUser));
router.delete("/users/:id", requireAuth, asyncHandler(u.deleteUser));

module.exports = router;
