'use strict';

module.exports = (sequelize: any, DataTypes: any) => {
  const Course = sequelize.define(
    'courses',
    {
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
    },
    {},
  );
  Course.associate = function (models: any) {
    Course.belongsToMany(models.students, {
      through: 'course_students',
      as: 'students',
      foreign_key: 'courseId',
    });

    Course.belongsTo(models.lecturers, { as: 'course_lecturer' });
  };
  return Course;
};
