'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 1,
        first_name: 'Super',
        last_name: 'Admin',
        role_id:1,
        email:'superadmin@yopmail.com',
        password:'$2b$10$osAp5mKsR90sBRND.LMZ6.ZVjBP6xsS0b2C1w47yFOOZgTNsObTVC',
        age:30,
        status:'1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        first_name: 'Admin',
        last_name: '',
        role_id:2,
        email:'admin@yopmail.com',
        password:'$2b$10$osAp5mKsR90sBRND.LMZ6.ZVjBP6xsS0b2C1w47yFOOZgTNsObTVC',
        age:26,
        status:'1',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
