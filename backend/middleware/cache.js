const { getClient } = require("../config/redis");

const cache = (duration = 60) => async (req, res, next) => {
  const client = getClient();

  // Αν δεν υπάρχει Redis, προχώρα κανονικά
  if (!client) return next();

  const key = `cache:${req.user._id}:${req.originalUrl}`;

  try {
    const cached = await client.get(key);
    if (cached) {
      console.log(`🟢 Cache HIT: ${key}`);
      return res.json(JSON.parse(cached));
    }

    const originalJson = res.json.bind(res);
    res.json = async (data) => {
      await client.setEx(key, duration, JSON.stringify(data));
      console.log(`🔵 Cache SET: ${key}`);
      return originalJson(data);
    };

    next();
  } catch (error) {
    console.error("Cache error:", error);
    next();
  }
};

const clearUserCache = async (userId) => {
  const client = getClient();
  if (!client) return; // Αν δεν υπάρχει Redis, παράλειψε

  try {
    const keys = await client.keys(`cache:${userId}:*`);
    if (keys.length > 0) {
      await client.del(keys);
      console.log(`🗑️ Cache cleared for user: ${userId}`);
    }
  } catch (error) {
    console.error("Cache clear error:", error);
  }
};

module.exports = { cache, clearUserCache };