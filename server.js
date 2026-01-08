/**
 * @file server.js
 * @description Point d'entrée de l'application Port Russell (Express + EJS).
 */

require("dotenv").config();
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./config/db");

const app = express();

const authRoutes = require("./routes/auth.routes");

const requireAuth = require("./middlewares/requireAuth");
const apiCatwaysRoutes = require("./routes/api.catways.routes");
const apiReservationsRoutes = require("./routes/api.reservations.routes");
const { renderDashboard } = require("./controllers/dashboard.controller");
const swaggerUi = require("swagger-ui-express");
const { swaggerSpec } = require("./config/swagger");

// Connexion MongoDB
connectDB(process.env.MONGODB_URI);

// Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); // pour lire les formulaires HTML
app.use(express.json()); // pour l'API JSON
app.use(cookieParser());

// Static
app.use("/public", express.static(path.join(__dirname, "public")));

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(authRoutes);
app.use("/api", apiCatwaysRoutes);
app.use("/api", apiReservationsRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes (pour l'instant juste la home)
app.get("/", (req, res) => {
  res.render("home", {
    title: "Port Russell - Gestion des réservations",
    apiDocsUrl: "/api-docs", // on la mettra en place plus tard
  });
});
app.get("/dashboard", requireAuth, renderDashboard);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);
