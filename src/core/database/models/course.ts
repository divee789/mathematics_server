'use strict';
module.exports = (sequelize: any, DataTypes: any) => {
  const Course = sequelize.define(
    'courses',
    {
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
      }
    },
    {},
  );
  Course.associate = function (models: any) {
    Course.belongsToMany(models.students, {
      through: 'course_students',
      as:'students',
      foreign_key:'course_id'
    });
  };
  return Course;
};

// course.getStudent
// film.setFestival
// film.addFestival
// film.addFestivals
