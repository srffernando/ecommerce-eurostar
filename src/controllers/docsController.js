const swaggerUi = require('swagger-ui-express');
const docsService = require('../services/docsService');

const swaggerDocument = docsService.loadSpec();

const serve = swaggerUi.serve;
const setup = swaggerUi.setup(swaggerDocument);

module.exports = {
  serve,
  setup,
};
