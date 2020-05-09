module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('monitor');

  // const ErrMonitorSchema = new Schema({
  //   name: { type: String },
  //   age: { type: Number },
  //   date: { type: Date }
  // });

  const ErrMonitorSchema = new Schema({
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

  return conn.model('ErrMonitor', ErrMonitorSchema);
};
