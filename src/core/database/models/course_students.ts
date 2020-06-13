'use strict';
module.exports = (sequelize: any, DataTypes: any) => {
  const course_students = sequelize.define(
    'course_students',
    {
      courseId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id',
        },
      },
      studentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id',
        },
      },
    },
    {},
  );

  return course_students;
};
