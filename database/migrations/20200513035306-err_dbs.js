'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    console.log('在数据里新建了err_dbs表');
    const { INTEGER, DATE, STRING } = Sequelize;
    return queryInterface.createTable('err_dbs', {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      age: INTEGER,
      created_at: DATE,
      updated_at: DATE
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
