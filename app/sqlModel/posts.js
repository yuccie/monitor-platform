'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Posts = app.sqlModel.define('posts', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    desc: { type: INT }
  });

  return Posts;
};