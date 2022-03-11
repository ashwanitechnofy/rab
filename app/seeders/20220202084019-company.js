'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Companies', [
      {
        id: 1,
        name: 'Toyota',
        category_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
      id: 2,
      name: 'Ford Motor',
      category_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      name: 'Daimler',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Companies', null, {});
  }
};
