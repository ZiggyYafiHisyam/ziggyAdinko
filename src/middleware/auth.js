const requireAuth = (req, res, next) => {
    if (req.user || (req.session && req.session.user)) {
        return next();
    }
    return res.status(401).json({
        message: 'Unauthorized: Sesi admin belum login atau sudah kedaluwarsa.'
    });
};

module.exports = { requireAuth };
