const path = require('path');
const fs = require('fs');
module.exports = app => {
  const exports = {};

  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  };

  exports.view = {
    cache: false
  };

  exports.vuessr = {
    layout: path.join(app.baseDir, 'app/web/view/layout.html'),
    renderOptions: {
      // 告诉 vue-server-renderer 去 app/view 查找异步 chunk 文件
      basedir: path.join(app.baseDir, 'app/view')
    }
  };

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };

  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  exports.keys = '123456';

  exports.middleware = [
    'locals',
    'access',
    'errHandler',
    'reqHandler'
  ];

  // 增加mongoose
  exports.mongoose = {
    clients: {
      monitor: {
        url: 'mongodb://monitorOwner:123456@127.0.0.1:27017/monitor',
        options: {},
      },
    },
  };

  exports.sequelize = require('../database/config.json').development;

  exports.redis = {
    client: {
      port: 6379,
      host: '127.0.0.1',
      password: '',
      db: 0
    }
  }

  exports.cors = {
    // origin: ctx => ctx.get('origin'),
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    // 下面这条加上才能共享跨域session，同时前端ajax请求也要加上响应的参数
    // credentials: true,
  };

  exports.security = {
    csrf: {
      enable: false
    }
  }

  return exports;
};
