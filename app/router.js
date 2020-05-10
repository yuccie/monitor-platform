
module.exports = app => {
  app.get('/api/article/list', app.controller.app.list);
  app.get('/api/article/:id', app.controller.app.detail);

  // 增加异常监控
  app.get('/app/web/asset/js/*', app.controller.errMonitor.getSdk);
  app.post('/pushErr', app.controller.errMonitor.pushErr);
  app.get('/getErr', app.controller.errMonitor.getErr);
  app.get('/delErr', app.controller.errMonitor.delErr);
  app.get('/updateErr', app.controller.errMonitor.updateErr);

  // 务必放到最后
  app.get('/*', app.controller.app.index);
};
