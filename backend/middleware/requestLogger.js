const morgan  = require("morgan");
const logger  = require("../config/logger");

// Στέλνει τα morgan logs στο winston
const stream = {
  write: (message) => logger.http(message.trim()),
};

const requestLogger = morgan(
  ":method :url :status :res[content-length] - :response-time ms",
  { stream }
);

module.exports = requestLogger;