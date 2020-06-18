import { UserInputError, ApolloError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isSuperAdmin, isAdmin } from './authorization';

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
        return await models.courses.findAll({
          where: {
            lecturerId: id,
          },
        });
      },
    ),
  },

  Mutation: {
    updateLecturer: combineResolvers(
      isSuperAdmin,
      async (
        parent: any,
        { id, first_name, last_name, email, title, position, department },
        { models }: any,
      ) => {
        const lecturer = await models.lecturers.findByPk(id);
        if (!lecturer) throw new ApolloError('This lecturer does not exist in our database', '404');
        lecturer.first_name = first_name;
        lecturer.last_name = last_name;
        lecturer.email = email;
        lecturer.title = title;
        lecturer.position = position;
        lecturer.department = department;

        await lecturer.save();

        return { message: 'Lecturer Updated Successfully' };
      },
    ),
  },
};
