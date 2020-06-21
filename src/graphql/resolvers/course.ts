import { ApolloError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAdmin, isAuthenticated } from './authorization';
import { NOTFOUND, DUPLICATE } from '../../core/constants';

export default {
  Query: {
    courses: combineResolvers(isAuthenticated, async (parent: any, args: any, { models }: any) => {
      return await models.courses.findAll();
    }),
    course: combineResolvers(
      isAuthenticated,
      async (parent: any, { id }: { id: string }, { models }: any) => {
        const course = await models.courses.findByPk(id);
        if (!course) {
          throw new ApolloError('This course does not exist', NOTFOUND);
        }
        return course;
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

    editCourse: combineResolvers(
      isAdmin,
      async (parent, { id, title, code, credit_load, semester }, { models, student }) => {
        const course = await models.courses.findByPk(id);
        if (!course) throw new ApolloError('This course does not exist', NOTFOUND);
        course.title = title;
        course.code = code;
        course.credit_load = credit_load;
        course.semester = semester;
        await course.save();
        return course;
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
        throw new ApolloError('This lecturer does not exist', NOTFOUND);
      }

      const course = await models.courses.findByPk(id);
      if (!course) {
        throw new ApolloError('This course does not exist', NOTFOUND);
      }
      await course.setLecturer(lecturer);
      return { message: 'Lecturer assigned successfully' };
    }),
  },
};
