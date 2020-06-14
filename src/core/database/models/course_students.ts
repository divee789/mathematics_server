'use strict';
module.exports = (sequelize: any, DataTypes: any) => {
  const course_students = sequelize.define(
    'course_students',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      grade:{
        type: DataTypes.STRING
      }
    },
    {},
  );

  return course_students;
};
