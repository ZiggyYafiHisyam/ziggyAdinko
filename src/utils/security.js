const crypto = require('crypto');

/**
 * Hash a password using SHA-256 with a salt
 */
const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
};

/**
 * Verify a plain password against the stored salt:hash string
 */
const verifyPassword = (password, storedHash) => {
    if (!storedHash) return false;
    // Support plain text fallback for initial development or legacy hashes
    if (!storedHash.includes(':')) {
        return password === storedHash;
    }
    const [salt, originalHash] = storedHash.split(':');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === originalHash;
};

// In-Memory Session Store
const sessions = new Map();
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

const createSession = (userData) => {
    const sessionId = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + SESSION_TTL_MS;
    sessions.set(sessionId, {
        user: userData,
        expiresAt
    });
    return sessionId;
};

const getSession = (sessionId) => {
    if (!sessionId) return null;
    const session = sessions.get(sessionId);
    if (!session) return null;
    if (Date.now() > session.expiresAt) {
        sessions.delete(sessionId);
        return null;
    }
    return session;
};

const destroySession = (sessionId) => {
    if (sessionId) {
        sessions.delete(sessionId);
    }
};

module.exports = {
    hashPassword,
    verifyPassword,
    createSession,
    getSession,
    destroySession,
    SESSION_TTL_MS
};
