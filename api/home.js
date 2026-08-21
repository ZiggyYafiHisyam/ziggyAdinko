const createApiHandler = require('../src/apiHandler');
const homeRoutes = require('../src/routes/home');

module.exports = createApiHandler(homeRoutes);
