'use strict';

module.exports = async app => {
  // 解构出数据类型
  const { STRING, INTEGER, DATE } = app.Sequelize;
  // 表名
  const tableName = 'pref_dbs'

  const prefDbs = app.sqlModel.define(
    tableName,
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      age: INTEGER,
      created_at: STRING,
      // updated_at: DATE
    },
    { freezeTableName: true } 
  );
  
  // 模型同步，其实也就是对数据库执行什么操作
  await prefDbs.sync({ force: true }); // 将创建表,如果表已经存在,则将其首先删除
  // await prefDbs.sync({ alter: true }); // 这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
  // await prefDbs.sync({}); // 如果表不存在,则创建该表(如果已经存在,则不执行任何操作)
  // await prefDbs.drop();   // 删除模型相关的表


  return prefDbs;
};
