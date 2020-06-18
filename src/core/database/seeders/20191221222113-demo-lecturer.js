'use strict';
const { v4: uuidv4 } = require('uuid');


module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('lecturers', [
      {
        id: uuidv4(),
        first_name: "Charles",
        last_name: "Charles",
        title: "Professor",
        department: "Pure and applied mathematics",
        position: 'Senior Lecturer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        first_name: "John",
        last_name: "Ibe",
        title: "Doctor",
        department: "Pure and applied mathematics",
        position: "Lecturer 1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        first_name: 'Burger',
        last_name: "Jag",
        title: "Professor",
        department: "Pure and applied mathematics",
        position: "Lecturer 1",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: uuidv4(),
        first_name: "Sandra",
        last_name: "Ibevua",
        title: "Miss",
        department: "Pure and applied mathematics",
        position: 'Junior Lecturer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('lecturers', null, {});
  }
};