const requireAuth = (req, res, next) => {
    if (req.user) {
        return next();
    }
    return res.status(401).json({
        message: 'Unauthorized: Sesi admin belum login atau sudah kedaluwarsa.'
    });
};

module.exports = { requireAuth };
