// src/config/swagger.js

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Nalanda Library System API",
      version: "1.0.0",
      description:
        "API documentation for Nalanda Library System.To access the authenticated routes please add the token globally.you can setup this by clicking the button on the right corner of the screen ",
      contact: {
        name: "Assim Fayas k",
        email: "contactasim00@gmil.com",
      },
    },
    servers: [
      {
        url: ["https://nalanda-library-management-nvis.onrender.com"],
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "https",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};
