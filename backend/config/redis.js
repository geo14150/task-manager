let client = null;

const connectRedis = async () => {
  if (!process.env.REDIS_URL) {
    console.warn("⚠️  Redis disabled — running without cache");
    return;
  }
  // Redis logic εδώ όταν έχεις σωστό URL
};

const getClient = () => null; // Πάντα null μέχρι να ενεργοποιηθεί

module.exports = { connectRedis, getClient };