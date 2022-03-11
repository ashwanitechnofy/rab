'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('coupons', [
      {
        id: 1,
        type: 'Fixed Amount',
        name: 'firstname_001',
        amount: 100,
        from: '2022-02-09',
        to:  '2022-04-10',
        upTo_value:200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        type: 'Percentage',
        name: 'firstname_002',
        amount: 10,
        from: '2022-02-09',
        to:  '2022-04-10',
        upTo_value:220,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        type: 'Percentage',
        name: 'firstname_003',
        amount: 3,
        from: '2022-02-09',
        to:  '2022-04-10',
        createdAt: new Date(),
        updatedAt: new Date()
      },
  ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('coupons', null, {});
  }
};
