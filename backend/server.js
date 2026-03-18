const mongoose     = require("mongoose");
const app          = require("./app");
const logger       = require("./config/logger");
const { connectRedis } = require("./config/redis");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info("✅ MongoDB Connected!");
  } catch (error) {
    logger.error("❌ MongoDB Failed:", error.message);
    process.exit(1);
  }
};

connectDB();
connectRedis();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`🌐 Server running on http://localhost:${PORT}`));