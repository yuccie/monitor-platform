'use strict';

module.exports = async app => {
  const { STRING, INTEGER, DATE, ARRAY, TEXT } = app.Sequelize;
  // 表名
  const tableName = 'err_dbs';

  const ErrDbs = app.sqlModel.define(
    tableName,
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(20),        // ReferenceError、TypeError、
      created_at: STRING(20),  // 2020-06-15 14:15:55，长度为19
      title: STRING(50),       // 一般为页面的title，不会太长。
      projectName: STRING(50), // 一般是hostname，
      host: STRING(50),        // 一般是hostname，
      message: STRING(100),    // 类似：Cannot read property 'name' of undefined
      // content: STRING,      // content与message字段一致，这里就不要了
      errorType: STRING(10),   // js错误，网络错误等
      url: STRING(100),        // 如果包含中文的话，长度怎么判断？
      errorLevel: INTEGER,
      // 数据库中无法储存数组，直接将数组序列化存入
      stack: TEXT,             // 堆栈里信息长度可变
      // stack: [
      //   {
      //     columnNumber: INTEGER,
      //     lineNumber: INTEGER,
      //     fileName: STRING,
      //     functionName: STRING,
      //     source: STRING
      //   }
      // ],
      lineNumber: INTEGER,
      columnNumber: INTEGER,
      fileName: STRING(500),      // 错误信息，有可能是堆栈里的第一条，用来获取sourceMap
      recentClickEventList: TEXT, // 长度可变，最大64k,
      recentAjaxList: TEXT,       // 长度可变，最大64k,
      timestamp: STRING(13),      // 时间撮最长就是13位
      userAgent: STRING(255),     // 这个其实可以后台获取，不用前端，但字段需要有
    },
    // 默认情况下，Sequelize 会执行自动复数化，也就是将模型名改成复数形式
    // 然后作为表名，但为了统一起来，统一禁止自动复数，这里的tableName其实就是模型名
    // 然后模型名和数据表里的名字保持统一，防止乱
    { freezeTableName: true, underscored: true }
    // 当然还可以直接指定表名：
    // sequelize.define('User', {
    //   // ... (属性)
    // }, {
    //   tableName: 'Employees'
    // });
  );

  // await ErrDbs.drop();
  // 这种操作确实暴力，直接把原来的数据给干掉了
  // await ErrDbs.sync();
  await ErrDbs.sync({alter: true});
    // await ErrDbs.sync({ force: true }); // 删除表的数据

  return ErrDbs;
};
