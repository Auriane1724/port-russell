/**
 * @file middlewares/requireAuth.js
 * @description Middleware de protection des routes (JWT dans cookie).
 */

const jwt = require("jsonwebtoken");

/**
 * Protège une route : exige un JWT valide dans le cookie "token".
 * Si absent ou invalide => redirection vers "/".
 */
function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.redirect("/");

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { sub, role, iat, exp }
    return next();
  } catch (e) {
    res.clearCookie("token");
    return res.redirect("/");
  }
}

module.exports = requireAuth;
