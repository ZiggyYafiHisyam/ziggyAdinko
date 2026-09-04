const crypto = require('crypto');

/**
 * Hash a password using PBKDF2-SHA512 with a random salt. Stored as "salt:hash".
 */
const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
};

/**
 * Verify a plain password against the stored "salt:hash" string.
 */
const verifyPassword = (password, storedHash) => {
    if (!storedHash) return false;
    // Plain-text fallback for legacy / manually inserted rows
    if (!storedHash.includes(':')) {
        return password === storedHash;
    }
    const [salt, originalHash] = storedHash.split(':');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === originalHash;
};

// --- Stateless signed session token -----------------------------------------
// A serverless deploy (Vercel) runs many isolated instances, so an in-memory
// session store loses logins between requests. Instead we put a signed,
// tamper-proof token in the cookie: "<base64url(payload)>.<hmac>". Any instance
// can verify it with the shared SESSION_SECRET — no server-side storage.

const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const SESSION_SECRET = process.env.SESSION_SECRET
    || 'dev-only-insecure-secret-set-SESSION_SECRET-in-production';

const b64urlEncode = (str) => Buffer.from(str, 'utf8').toString('base64url');
const b64urlDecode = (str) => Buffer.from(str, 'base64url').toString('utf8');

const signSession = (user) => {
    const payload = {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role,
        exp: Date.now() + SESSION_TTL_MS
    };
    const body = b64urlEncode(JSON.stringify(payload));
    const sig = crypto.createHmac('sha256', SESSION_SECRET).update(body).digest('base64url');
    return `${body}.${sig}`;
};

const verifySession = (token) => {
    if (!token || typeof token !== 'string' || token.indexOf('.') === -1) return null;
    const [body, sig] = token.split('.');
    if (!body || !sig) return null;

    const expected = crypto.createHmac('sha256', SESSION_SECRET).update(body).digest('base64url');
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

    let payload;
    try {
        payload = JSON.parse(b64urlDecode(body));
    } catch {
        return null;
    }
    if (!payload || typeof payload.exp !== 'number' || Date.now() > payload.exp) return null;

    return {
        id: payload.id,
        username: payload.username,
        name: payload.name,
        role: payload.role
    };
};

module.exports = {
    hashPassword,
    verifyPassword,
    signSession,
    verifySession,
    SESSION_TTL_MS
};
