/**
 * @file config/swagger.js
 * @description Configuration Swagger (swagger-jsdoc).
 */

const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Port Russell API",
      version: "1.0.0",
      description: "API privée de gestion des catways et des réservations.",
    },
    servers: [{ url: "/" }],
  },
  apis: ["./routes/*.js", "./controllers/*.js"], // on lit les JSDoc de tes fichiers
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec };
