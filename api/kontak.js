const createApiHandler = require('../src/apiHandler');
const kontakRoutes = require('../src/routes/kontak');

module.exports = createApiHandler(kontakRoutes);
