/**
 * @file middlewares/requireAuth.js
 * @description Middleware d'authentification basé sur JWT cookie.
 */

const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function requireAuth(req, res, next) {
  try {
    const token = req.cookies?.token;
    if (!token) return res.redirect("/");

    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.sub).select("name email role");
    if (!user) {
      res.clearCookie("token");
      return res.redirect("/");
    }

    req.user = user;
    return next();
  } catch (e) {
    res.clearCookie("token");
    return res.redirect("/");
  }
}

module.exports = requireAuth;
