'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('vehicle_categories', [
      {
        id: 1,
        category_name: 'Scooty',
        image:'scooty.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        category_name: 'Car',
        image:'car.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        category_name: 'Bike',
        image:'bike.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('vehicle_categories', null, {});
  }
};
