const winston = require("winston");
require("winston-daily-rotate-file");

const { combine, timestamp, printf, colorize, errors } = winston.format;

// Custom format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Rotate αρχεία ανά μέρα
const fileRotate = new winston.transports.DailyRotateFile({
  filename:    "logs/app-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles:    "14d",  // Κράτα logs για 14 μέρες
  maxSize:     "20m",
});

const errorRotate = new winston.transports.DailyRotateFile({
  filename:    "logs/error-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  level:       "error",
  maxFiles:    "30d",
  maxSize:     "20m",
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [
    // Console με χρώματα
    new winston.transports.Console({
      format: combine(colorize(), timestamp({ format: "HH:mm:ss" }), logFormat),
    }),
    fileRotate,
    errorRotate,
  ],
});

module.exports = logger;