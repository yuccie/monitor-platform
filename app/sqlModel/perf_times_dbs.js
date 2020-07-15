'use strict';

module.exports = async app => {
  const { DECIMAL, STRING, TEXT , INTEGER} = app.Sequelize;

  const tableName = 'perf_times_dbs';

  const perfTimesDbs = app.sqlModel.define(
    tableName,
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(100),        // 如果包含中文的话，长度怎么判断？
      nextHopProtocol: STRING(10),
      decodedBodySize: INTEGER,
      encodedBodySize: INTEGER,
      transferSize: INTEGER,
      duration: DECIMAL(20, 3),
      entryType: STRING(20),
      initiatorType: STRING(20),
      type: STRING(20),
      workerStart: DECIMAL(20, 3),
      // serverTiming: TEXT,
      // js堆栈
      // jsHeapSizeLimit: INTEGER,
      // totalJSHeapSize: INTEGER,
      // usedJSHeapSize: INTEGER,
      // 页面打开情况
      redirectCount: INTEGER, // 重定向次数
      type: STRING(20),       // 页面加载类型，点击链接、重新加载、历史记录、其他方式
      // 时间线
      // DECIMAL不会丢失精度，DECIMAL(a,b)，a表示数值的总长度，b是小数位数
      // 采用float会丢失精度，mysql会自动四舍五入
      startTime: DECIMAL(20, 3),
      unloadEventStart: DECIMAL(20, 3),
      unloadEventEnd: DECIMAL(20, 3),
      redirectStart: DECIMAL(20, 3),
      redirectEnd: DECIMAL(20, 3),
      fetchStart: DECIMAL(20, 3),
      domainLookupStart: DECIMAL(20, 3),
      domainLookupEnd: DECIMAL(20, 3),
      connectStart: DECIMAL(20, 3),
      secureConnectionStart: DECIMAL(20, 3),
      connectEnd: DECIMAL(20, 3),
      requestStart: DECIMAL(20, 3),
      responseStart: DECIMAL(20, 3),
      responseEnd: DECIMAL(20, 3),
      domInteractive: DECIMAL(20, 3),
      domContentLoadedEventStart: DECIMAL(20, 3),
      domContentLoadedEventEnd: DECIMAL(20, 3),
      domContentLoadedEventEnd: DECIMAL(20, 3),
      domComplete: DECIMAL(20, 3),
      loadEventStart: DECIMAL(20, 3),
      loadEventEnd: DECIMAL(20, 3),
    },
    {
      freezeTableName: true, underscored: true
    }
  )

  // 同步数据库
  await perfTimesDbs.sync({ alter: true })

  return perfTimesDbs;
}