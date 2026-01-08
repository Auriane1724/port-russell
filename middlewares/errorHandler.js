/**
 * @file middlewares/errorHandler.js
 * @description Gestionnaire d'erreurs global (API).
 */

module.exports = (err, req, res, next) => {
  console.error("❌ Error:", err);

  const status = err.status || 500;
  const message = err.message || "Erreur serveur";

  // Si c'est une route API -> JSON
  if (req.originalUrl.startsWith("/api")) {
    return res.status(status).json({ error: message });
  }

  // Sinon -> message simple
  return res.status(status).send(message);
};
