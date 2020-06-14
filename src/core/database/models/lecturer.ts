'use strict';
module.exports = (sequelize: any, DataTypes: any) => {
  const lecturer = sequelize.define(
    'lecturers',
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
      phone_number: DataTypes.STRING,
      email: DataTypes.STRING,
      profile_image: DataTypes.STRING,
    },
    {},
  );
  lecturer.associate = function (models: any) {
    lecturer.hasMany(models.courses, { as:'course_lecturer' })
  };
  return lecturer;
};
