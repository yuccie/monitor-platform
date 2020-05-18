'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

    const { INTEGER, DATE, STRING } = Sequelize;
    const tableName = 'err_dbs';

    return queryInterface.createTable(tableName, {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      age: INTEGER,
      created_at: STRING,
      // desc: STRING
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
   console.log('在数据里删除了err_dbs表');
   return queryInterface.dropTable('err_dbs');
  }
};
