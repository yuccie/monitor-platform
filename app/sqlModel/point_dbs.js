'use strict';

module.exports = async app => {
  const { STRING } = app.Sequelize;
  const tableName = 'point_dbs';

  const PointDbs = app.sqlModel.define(
    tableName,
    {
      title: STRING,
      name: STRING,
      created_at: STRING
    },
    {
      freezeTableName: true
    }
  );

  await PointDbs.sync({alter: true});
  // await PointDbs.drop();
  return PointDbs;
};
