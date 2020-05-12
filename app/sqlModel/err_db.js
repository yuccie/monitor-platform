'use strict';

module.exports = app => {
  console.log(1);
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const ErrDb = app.sqlModel.define(
    'err_dbs',
    {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      age: INTEGER,
      created_at: DATE,
      updated_at: DATE
    },
    // https://blog.csdn.net/qq_24010663/article/details/103586125
    // { define: { freezeTableName: true } }
  );

  return ErrDb;
};
