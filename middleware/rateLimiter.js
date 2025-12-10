const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3,
  message: { message: 'Too many login attempts, try again later.' },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { loginLimiter };
