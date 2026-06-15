const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const swaggerPath = path.join(__dirname, '../../swagger.yaml');

function loadSpec() {
  return yaml.load(fs.readFileSync(swaggerPath, 'utf8'));
}

module.exports = {
  loadSpec,
};
