const mongoose = require('mongoose');
const BlacklistedToken = require('../models/blacklistedToken.model');
const jwt = require('jsonwebtoken');

// In-memory set for sub-millisecond (0ms) lookup without hitting DB on every request
const inMemoryBlacklist = new Set();

/**
 * Add a token to the blacklist with TTL
 * @param {string} token - JWT token string
 * @param {string} [userId] - Optional User ID
 * @param {string} [reason] - Reason for blacklisting ('logout', 'password_change', 'revoked')
 */
async function blacklistToken(token, userId = null, reason = 'logout') {
  if (!token || typeof token !== 'string') return;

  // Add to fast in-memory cache
  inMemoryBlacklist.add(token);

  try {
    let expiresAt;
    try {
      const decoded = jwt.decode(token);
      if (decoded && decoded.exp) {
        expiresAt = new Date(decoded.exp * 1000);
      }
    } catch (_) {}

    // Fallback: 7 days from now if expiration timestamp wasn't found
    if (!expiresAt || isNaN(expiresAt.getTime())) {
      expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    }

    if (mongoose.connection && mongoose.connection.readyState === 1) {
      await BlacklistedToken.findOneAndUpdate(
        { token },
        { token, user: userId, reason, expiresAt },
        { upsert: true, new: true }
      );
    }
  } catch (err) {
    console.error('[Blacklist] Error recording blacklisted token:', err.message);
  }
}

/**
 * Check if a token is blacklisted
 * @param {string} token - JWT token string
 * @returns {Promise<boolean>}
 */
async function isTokenBlacklisted(token) {
  if (!token || typeof token !== 'string') return false;

  // 1. Fast path: In-memory cache hit
  if (inMemoryBlacklist.has(token)) {
    return true;
  }

  // 2. Fallback: Database lookup if DB is connected
  try {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const exists = await BlacklistedToken.exists({ token });
      if (exists) {
        inMemoryBlacklist.add(token);
        return true;
      }
    }
  } catch (err) {
    console.error('[Blacklist] DB lookup error:', err.message);
  }

  return false;
}

module.exports = {
  blacklistToken,
  isTokenBlacklisted,
};
