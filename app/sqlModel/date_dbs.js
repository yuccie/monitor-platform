'use strict';

module.exports = async app => {
  // 解构出数据类型
  const { STRING, INTEGER, DATE, ARRAY } = app.Sequelize;
  // 表名
  const tableName = 'date_dbs';
  
  // 必须先定义表结构，才可以创建数据，如果同时定义数据结构，然后直接就创建数据会提示列不存在。
  // 另外created_at和updated_at无法修改，是数据库默认生成的当前时间日期。
  const DateDbs = app.sqlModel.define(tableName, {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    create_time: DATE,
    update_time: DATE,
  }, { freezeTableName: true, underscored: true, timestamps: false });

  // 定义数据
  // 如果只插入日期字符串呢？
  // let dateList = Array.from({length: 30}, (item, idx) => {
  //   let curDate = Date.now();
  //   let oneDay = 24*60*60*1000;
  //   item = {
  //     create_time: curDate - idx * oneDay,
  //     update_time: curDate - idx * oneDay,
  //   }
  //   return item
  // })

  // 批量插入数据
  // await DateDbs.bulkCreate(dateList)   // 批量插入数据
  // await DateDbs.sync({ force: true }); // 删除表的数据
  await DateDbs.sync({alter: true});

  return DateDbs;
};
