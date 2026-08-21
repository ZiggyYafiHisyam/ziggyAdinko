const createApiHandler = require('../src/apiHandler');
const aboutRoutes = require('../src/routes/about');

module.exports = createApiHandler(aboutRoutes);
