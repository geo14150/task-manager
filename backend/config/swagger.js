const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title:       "TaskFlow API",
      version:     "1.0.0",
      description: "Task Management Platform — REST API Documentation",
    },
    servers: [{ url: "http://localhost:5000" }],
    components: {
      securitySchemes: {
        BearerAuth: {
          type:   "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: ["./routes/*.js"], // Διαβάζει τα JSDoc comments από τα routes
};

module.exports = swaggerJSDoc(options);