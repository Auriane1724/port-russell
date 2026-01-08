/**
 * @file routes/auth.routes.js
 * @description Routes d'authentification (login/logout).
 */

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/**
 * POST /login
 * @param {string} email
 * @param {string} password
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Formulaire HTML -> express.urlencoded() doit être actif (déjà le cas)
    if (!email || !password) {
      return res.status(400).send("Email et mot de passe obligatoires.");
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(401).send("Identifiants invalides.");

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).send("Identifiants invalides.");

    const token = jwt.sign(
      { sub: user._id.toString(), role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    // Cookie HTTP-only
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
    });

    return res.redirect("/dashboard");
  } catch (e) {
    console.error(e);
    return res.status(500).send("Erreur serveur.");
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
