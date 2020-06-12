'use strict';
module.exports = (sequelize: any, DataTypes: any) => {
  const Student = sequelize.define(
    'students',
    {
      first_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      last_name: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      matriculation_number: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      profile_image: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      department: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
    },
    {},
  );
  Student.associate = function (models: any) {
    Student.belongsToMany(models.courses, {
      through: 'course_students',
      as: 'courses',
      foreign_key: 'student_id'
    });
  };
  return Student;
};
