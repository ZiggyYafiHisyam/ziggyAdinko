const { verifySession, signSession, SESSION_TTL_MS } = require('../utils/security');

const parseCookies = (cookieHeader = '') => {
    const list = {};
    if (!cookieHeader) return list;
    cookieHeader.split(';').forEach(cookie => {
        const parts = cookie.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            const val = parts.slice(1).join('=').trim();
            list[key] = decodeURIComponent(val);
        }
    });
    return list;
};

const sessionMiddleware = (req, res, next) => {
    const cookies = parseCookies(req.headers.cookie);
    const user = verifySession(cookies.sid);

    req.user = user;
    req.session = user ? { user } : {};

    // Secure flag only over HTTPS (Vercel / Railway); plain cookie for local http.
    const isHttps = req.secure || req.headers['x-forwarded-proto'] === 'https';
    const secure = isHttps ? '; Secure' : '';
    const maxAge = Math.floor(SESSION_TTL_MS / 1000);

    req.login = (sessionUser) => {
        const token = signSession(sessionUser);
        req.user = sessionUser;
        req.session = { user: sessionUser };
        res.setHeader('Set-Cookie', `sid=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure}`);
    };

    req.logout = () => {
        req.user = null;
        req.session = {};
        res.setHeader('Set-Cookie', `sid=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure}`);
    };

    next();
};

module.exports = sessionMiddleware;
