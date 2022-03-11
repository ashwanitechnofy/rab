'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
      id: 1,
      title: 'Rental activity',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      title: 'Adventure activity',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      title: 'Rafting',
      parent: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 4,
      title: 'Paragliding',
      parent: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 5,
      title: 'Cycling',
      parent: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 6,
      title: 'Trekking',
      parent: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 7,
      title: 'Scuba Diving',
      parent: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 8,
      title: 'Bike Riding',
      parent: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 9,
      title: 'Cliff Jumping',
      parent: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 10,
      title: 'Hot Air Ballooning',
      parent: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
