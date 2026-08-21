const createApiHandler = require('../src/apiHandler');
const portofolioRoutes = require('../src/routes/portofolio');

module.exports = createApiHandler(portofolioRoutes);
