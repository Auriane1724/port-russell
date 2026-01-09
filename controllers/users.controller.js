/**
 * @file controllers/users.controller.js
 * @description Contrôleur Users (API CRUD).
 */

const userService = require("../services/user.service");

async function listUsers(req, res) {
  const data = await userService.list();
  return res.status(200).json({ data });
}

async function getUser(req, res) {
  const item = await userService.getById(req.params.id);
  if (!item) return res.status(404).json({ error: "Utilisateur introuvable" });
  return res.status(200).json({ data: item });
}

async function createUser(req, res) {
  const created = await userService.create(req.body);
  return res.status(201).json({ data: created });
}

async function updateUser(req, res) {
  const updated = await userService.update(req.params.id, req.body);
  if (!updated)
    return res.status(404).json({ error: "Utilisateur introuvable" });
  return res.status(200).json({ data: updated });
}

async function deleteUser(req, res) {
  const deleted = await userService.remove(req.params.id);
  if (!deleted)
    return res.status(404).json({ error: "Utilisateur introuvable" });
  return res.status(204).send();
}

module.exports = { listUsers, getUser, createUser, updateUser, deleteUser };
