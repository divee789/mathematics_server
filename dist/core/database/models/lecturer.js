'use strict';
module.exports = (sequelize, DataTypes) => {
    const lecturer = sequelize.define('lecturers', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        first_name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING(),
            allowNull: false,
        },
        department: {
            type: DataTypes.STRING(),
        },
        position: {
            type: DataTypes.STRING(),
        },
        phone_number: DataTypes.STRING,
        email: DataTypes.STRING,
        profile_image: DataTypes.STRING,
    }, {});
    lecturer.associate = function (models) {
        lecturer.hasMany(models.courses, { as: 'lecturer' });
    };
    return lecturer;
};
