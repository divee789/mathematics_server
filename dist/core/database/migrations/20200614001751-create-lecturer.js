'use strict';
const { v4: uuidv4 } = require('uuid');
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('lecturers', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: uuidv4(),
            },
            first_name: {
                type: Sequelize.STRING
            },
            last_name: {
                type: Sequelize.STRING
            },
            title: {
                type: Sequelize.STRING
            },
            department: {
                type: Sequelize.STRING
            },
            position: {
                type: Sequelize.STRING
            },
            phone_number: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            profile_image: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('lecturers');
    }
};
