const express = require('express');

const createApiHandler = (router) => {
  const app = express();
  app.use(express.json());
  app.use(router);
  return app;
};

module.exports = createApiHandler;
