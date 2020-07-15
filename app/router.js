module.exports = app => {
  app.get('/api/article/list', app.controller.app.list);
  app.get('/api/article/:id', app.controller.app.detail);

  // 增加异常监控
  app.get('/app/web/asset/js/*', app.controller.err.getSdk);
  app.post('/pushErr', app.controller.err.pushErr);
  app.post('/getErr', app.controller.err.getErr);
  app.get('/delErr', app.controller.err.delErr);
  app.get('/updateErr', app.controller.err.updateErr);

  // 增加性能监控
  app.get('/getPerf', app.controller.perf.index);

  // 操作mysql数据库的方法
  app.post('/getTypeErr', app.controller.err.getTypeErr);
  app.post('/getErrList', app.controller.err.getErrList);
  app.get('/delSqlErr', app.controller.err.delSqlErr);
  app.post('/updateSqlErr', app.controller.err.updateSqlErr);
  app.post('/getErrTrand', app.controller.err.getErrTrand); // 获取异常监控里的错误趋势图
  app.post('/getErrDetail', app.controller.err.getErrDetail); // 获取单条异常数据
  app.post('/delErrDetail', app.controller.err.delErrDetail); // 删除单条异常数据
  app.post('/getSourceMap', app.controller.err.getSourceMap); // 获取单条异常数据的sourceMap

  // 性能监控
  app.post('/updatePerfTimes', app.controller.perf.updatePerfTimes); // 获取单条异常数据的sourceMap
  app.post('/getTypePerf', app.controller.perf.getTypePerf); // 获取不同类型耗时最高的项，前几项，比如dom下载时间最长的几项
  app.post('/getPerfList', app.controller.perf.getPerfList); // 获取不同类型耗时最高的项，前几项，比如dom下载时间最长的几项

  // 操作redis里的方法
  app.get('/getRedisErr', app.controller.err.getRedisErr);
  app.get('/delRedisErr', app.controller.err.delRedisErr);
  app.get('/setRedisErr', app.controller.err.setRedisErr);

  // 务必放到最后
  app.get('/*', app.controller.app.index);
};
