module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('monitor');

  // const ErrDbSchema = new Schema({
  //   name: { type: String },
  //   age: { type: Number },
  //   date: { type: Date }
  // });

  const ErrDbSchema = new Schema({
    name: String,
    title: String,
    projectName: String,
    host: String,
    message: String,
    content: String,
    errorType: String,
    url: String,
    errorLevel: Number,
    stack: [
      {
        columnNumber: Number,
        lineNumber: Number,
        fileName: String,
        functionName: String,
        source: String
      }
    ],
    lineNumber: Number,
    columnNumber: Number,
    fileName: String,
    // recentClickEventList: Mixed,
    // recentAjaxList: Mixed,
    cookies: String,
    userAgent: String
  });

  // 这里的命名都可以用ErrDb，或者驼峰等等，
  // 但是在model文件夹里的文件名最好用下划线，因为使用驼峰，会在数据库里全变为小写。。。
  // 比如文件名为：errMonitor => 到数据库里就变为：errmonitor，如果此时查看errmonitor里的文档，发现为空
  // 另外这个文件名，还必须与ErrDb，保持字母的一致性
  return conn.model('ErrDb', ErrDbSchema);
};
