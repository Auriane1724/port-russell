/**
 * @file middlewares/asyncHandler.js
 * @description Wrapper pour gérer automatiquement les erreurs des fonctions async.
 */

module.exports = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
