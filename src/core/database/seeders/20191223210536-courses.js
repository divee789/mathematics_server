'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  up: (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('courses', [
      {
        id: uuidv4(),
        title: 'test course 1',
        code: 'test001',
        credit_load: 3,
        semester: 1,
        level: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'test course 2',
        code: 'test002',
        credit_load: 3,
        semester: 2,
        level: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'test2 course 1',
        code: 'test201',
        credit_load: 3,
        semester: 1,
        level: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'test2 course 2',
        code: 'test202',
        credit_load: 3,
        semester: 1,
        level: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        title: 'random',
        code: '000',
        credit_load: 2,
        semester: 1,
        level: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('courses', null, {});

  }
}
