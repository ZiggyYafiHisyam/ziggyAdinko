const createApiHandler = require('../src/apiHandler');
const layananRoutes = require('../src/routes/layanan');

module.exports = createApiHandler(layananRoutes);
