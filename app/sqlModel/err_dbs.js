'use strict';

module.exports = async app => {
  // 解构出数据类型
  const { STRING, INTEGER, DATE, ARRAY, TEXT } = app.Sequelize;
  // 表名
  const tableName = 'err_dbs';

  const ErrDbs = app.sqlModel.define(
    tableName,
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      created_at: STRING,
      title: STRING,
      projectName: STRING,
      host: STRING,
      message: STRING,
      content: STRING,
      errorType: STRING,
      url: STRING,
      errorLevel: INTEGER,
      // 数据库中无法储存数组，直接将数组序列化存入
      stack: STRING(5000),
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
      fileName: STRING(1000),
      recentClickEventList: TEXT,
      recentAjaxList: TEXT,
      timestamp: STRING,
      // cookies: STRING,
      userAgent: STRING,
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
