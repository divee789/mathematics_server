import { ApolloError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAdmin, isAuthenticated } from './authorization';

export default {
  Query: {
    courses: combineResolvers(isAuthenticated, async (parent: any, args: any, { models }: any) => {
      return await models.courses.findAll();
    }),
    course: combineResolvers(
      isAuthenticated,
      async (parent: any, { id }: { id: string }, { models }: any) => {
        return await models.courses.findByPk(id);
      },
    ),
    course_students: combineResolvers(
      isAdmin,
      async (parent: any, { id }: { id: string }, { models }: any) => {
        const courseStudents = await models.courses.findOne({
          where: {
            id,
          },
          include: [
            {
              model: models.students,
              as: 'students',
            },
          ],
        });
        return courseStudents;
      },
    ),
  },
  Mutation: {
    createCourse: combineResolvers(
      isAdmin,
      async (parent, { title, code, credit_load, semester }, { models, student }) => {
        return await models.courses.create({
          title,
          code,
          credit_load,
          level: student.level,
          semester,
        });
      },
    ),

    deleteCourse: combineResolvers(
      isAdmin,
      async (parent: any, { id }: { id: string }, { models }: any) => {
        return await models.courses.destroy({ where: { id } });
      },
    ),

    assignLecturer: combineResolvers(isAdmin, async (parent, { lecturer_id, id }, { models }) => {
      const lecturer = await models.lecturers.findOne({
        where: {
          id: lecturer_id,
        },
      });
      if (!lecturer) {
        throw new ApolloError('This lecturer does not exist', '404');
      }

      const course = await models.courses.findByPk(id);
      if (!course) {
        throw new ApolloError('This course does not exist', '404');
      }
      await course.setLecturer(lecturer);
      return { message: 'Lecturer assigned successfully' };
    }),
  },
};
