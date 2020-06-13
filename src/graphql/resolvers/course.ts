import { combineResolvers } from 'graphql-resolvers';
import { isAdmin } from './authorization';

export default {
  Query: {
    courses: async (parent: any, args: any, { models }: any) => {
      return await models.courses.findAll();
    },
    course: async (parent: any, { id }: { id: string }, { models }: any) => {
      return await models.course.findByPk(id);
    },
    course_students: async (course: any, args: any, { models }: any) => {
      return await models.course_students.findAll({
        where: {
          course_id: course.id,
        },
        include: [
          {
            model: models.students,
            as: 'students',
          },
        ],
      });
    },
  },
  Mutation: {
    createCourse: combineResolvers(
      isAdmin,
      async (parent, { title, code, credit_load, level }, { models }) => {
        return await models.courses.create({
          title,
          code,
          credit_load,
          level,
        });
      },
    ),
    deleteCourse: async (parent: any, { id }: { id: string }, { models }: any) => {
      return await models.courses.destroy({ where: { id } });
    },
  },
};
