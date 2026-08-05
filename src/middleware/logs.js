const logRequest = (req, res, next) => {
    console.log('log is running request to PATH:', req.path);
    next();
}

module.exports = logRequest;