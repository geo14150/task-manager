const rateLimit = require("express-rate-limit");

// Γενικό limiter για όλα τα routes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 λεπτά
  max: 100,                  // max 100 requests ανά IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: "Πολλά requests. Δοκίμασε ξανά σε 15 λεπτά.",
  },
});

// Αυστηρό limiter για auth routes (login/register)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 λεπτά
  max: 10,                   // max 10 απόπειρες login
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: "Πολλές απόπειρες σύνδεσης. Δοκίμασε ξανά σε 15 λεπτά.",
  },
});

module.exports = { globalLimiter, authLimiter };