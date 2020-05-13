'use strict';

const easywebpack = require('@easy-team/easywebpack-js');
const path = require('path');

var projectRoot = path.resolve(__dirname, '../');

const config = { 
  mode: 'production',
  entry: `${projectRoot}/app/web/asset/js/sdk.js`,
  output: {
    filename: 'errSdk.js',
    path: `${projectRoot}/public/js/`
  }
};
easywebpack.build(config);
