const express     = require("express");
const cors        = require("cors");
const swaggerUI   = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
require("dotenv").config();

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const { globalLimiter, authLimiter } = require("./middleware/rateLimiter");

const app = express();

// ← ΣΩΣΤΟ CORS
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://task-manager1-eta.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());
app.use(globalLimiter);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.get("/", (req, res) => res.json({ message: "🚀 Task Manager API is running!" }));
app.use("/api/auth",  authLimiter, authRoutes);
app.use("/api/tasks", taskRoutes);

module.exports = app;