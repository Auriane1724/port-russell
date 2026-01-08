/**
 * @file services/catway.service.js
 * @description Couche service pour les opérations Catway (CRUD).
 */

const Catway = require("../models/Catway");

/**
 * Liste tous les catways.
 * @returns {Promise<Array>}
 */
async function list() {
  return Catway.find().sort({ catwayNumber: 1 });
}

/**
 * Récupère un catway par son id Mongo.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
async function getById(id) {
  return Catway.findById(id);
}

/**
 * Crée un catway.
 * @param {{catwayNumber:number, catwayType:string, catwayState:string}} data
 * @returns {Promise<Object>}
 */
async function create(data) {
  return Catway.create(data);
}

/**
 * Met à jour un catway.
 * @param {string} id
 * @param {Object} data
 * @returns {Promise<Object|null>}
 */
async function update(id, data) {
  return Catway.findByIdAndUpdate(id, data, { new: true, runValidators: true });
}

/**
 * Supprime un catway.
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
async function remove(id) {
  return Catway.findByIdAndDelete(id);
}

module.exports = { list, getById, create, update, remove };
