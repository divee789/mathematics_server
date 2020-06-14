import { UserInputError, ApolloError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isSuperAdmin } from './authorization';

export default {
  Query: {
    lecturers: combineResolvers(isSuperAdmin, async (parent: any, args: any, { models }: any) => {
      return await models.lecturers.findAll();
    }),
    lecturer: combineResolvers(
      isAuthenticated,
      async (parent: any, { id }: { id: string }, { models }: any) => {
        return await models.lecturer.findOne({
          where: {
            id,
          },
        });
      },
    ),

    lecturer_courses: combineResolvers(
      isAuthenticated,
      async (parent: any, { id }: { id: string }, { models }: any) => {
        const result = await models.students.findOne({
          where: {
            id
          },
          include: [
            {
              model: models.courses,
              as: 'courses'
            },
          ],
        });
        return result;
      },
    ),
  },
};
