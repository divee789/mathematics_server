'use strict';
module.exports = (sequelize: any, DataTypes: any) => {
  const course_students = sequelize.define(
    'course_students',
    {
      course_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'id',
        },
      },
      student_id: {
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
