'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('courses', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: uuidv4(),
            },
            title: {
                type: Sequelize.STRING,
                allowNull: false
            },
            code: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            credit_load: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            level: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            semester: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            lecturerId: {
                type: Sequelize.UUID,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('courses');
    },
};
