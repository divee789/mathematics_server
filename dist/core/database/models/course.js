'use strict';
module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('courses', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING(10),
            allowNull: false,
            unique: true,
        },
        credit_load: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        level: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        semester: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {});
    Course.associate = function (models) {
        Course.belongsToMany(models.students, {
            through: 'course_students',
            as: 'students',
            foreign_key: 'courseId',
        });
        Course.belongsTo(models.lecturers, { as: 'lecturer' });
    };
    return Course;
};
