const express      = require("express");
const cors         = require("cors");
const swaggerUI    = require("swagger-ui-express");
const swaggerSpec  = require("./config/swagger");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const { globalLimiter, authLimiter } = require("./middleware/rateLimiter");

const app = express();

app.use(cors());
app.use(express.json());
app.use(globalLimiter);

// ← Swagger UI στο /api-docs
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get("/", (req, res) => res.json({ message: "🚀 Task Manager API — Docs: /api-docs" }));
app.use("/api/auth",  authLimiter, authRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;