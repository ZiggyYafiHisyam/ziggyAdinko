const { getSession, createSession, destroySession } = require('../utils/security');

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
    const sid = cookies.sid;
    const session = getSession(sid);

    req.sessionId = sid;
    req.session = session || {};
    req.user = session ? session.user : null;

    req.login = (user) => {
        const newSid = createSession(user);
        req.sessionId = newSid;
        req.session = { user };
        req.user = user;
        
        // Set HTTP-only session cookie
        res.setHeader('Set-Cookie', `sid=${newSid}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`);
    };

    req.logout = () => {
        if (req.sessionId) {
            destroySession(req.sessionId);
        }
        req.session = {};
        req.user = null;
        res.setHeader('Set-Cookie', `sid=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
    };

    next();
};

module.exports = sessionMiddleware;
