'use strict';

const path = require('path');

const mock = {};
require('fs').readdirSync(path.join(__dirname, '/mock')).forEach((file) => {
  Object.assign(mock, require('./mock/' + file));
});

module.exports = mock;
