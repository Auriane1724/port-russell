/**
 * @file services/user.service.js
 * @description Couche service pour les opérations User (CRUD).
 */

const User = require("../models/User");

/**
 * Liste les utilisateurs (sans passwordHash).
 */
async function list() {
  return User.find().select("-passwordHash").sort({ email: 1 });
}

async function getById(id) {
  return User.findById(id).select("-passwordHash");
}

/**
 * Crée un utilisateur.
 * ATTENTION: on attend un mot de passe en clair "password" et on stocke passwordHash.
 */
async function create(data) {
  const bcrypt = require("bcryptjs");
  const passwordHash = await bcrypt.hash(data.password, 10);

  return User.create({
    name: data.name || "User",
    email: data.email,
    passwordHash,
    role: data.role || "admin",
  });
}

async function update(id, data) {
  const updateData = { ...data };
  delete updateData.password; // on gère à part

  if (data.password) {
    const bcrypt = require("bcryptjs");
    updateData.passwordHash = await bcrypt.hash(data.password, 10);
  }

  return User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  }).select("-passwordHash");
}

async function remove(id) {
  return User.findByIdAndDelete(id);
}

module.exports = { list, getById, create, update, remove };
