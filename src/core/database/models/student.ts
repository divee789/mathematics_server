'use strict';

import bcrypt from 'bcryptjs';

module.exports = (sequelize: any, DataTypes: any) => {
  const Student = sequelize.define(
    'students',
    {
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
      matriculation_number: {
        type: DataTypes.STRING(200),
        allowNull: false,
        unique: true
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(200),
        allowNull: true,
        unique: true
      },
      password: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      phone_number: {
        type: DataTypes.STRING(200),
        allowNull: true,
        unique:true
      },
      profile_image: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      department: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      admin_level: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {},
  );
  Student.associate = function (models: any) {
    Student.belongsToMany(models.courses, {
      through: 'course_students',
      as: 'courses',
      foreign_key: 'studentId',
    });
  };

  Student.beforeCreate(async (student: any) => {
    student.password = await student.generatePasswordHash();
  });

  Student.prototype.generatePasswordHash = async function () {
    const saltRounds = 12;
    return await bcrypt.hash(this.password, saltRounds);
  };

  Student.prototype.validatePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
  };

  return Student;
};
