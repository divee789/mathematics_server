import { ForbiddenError } from 'apollo-server';
import { skip, combineResolvers } from 'graphql-resolvers'; // This is our midleware

export const isAuthenticated = (parent: any, args: any, { auth }: any) =>
  auth ? skip : new ForbiddenError('Access Denied');

export const isAdmin = combineResolvers(
  isAuthenticated,
  async (parent: any, args: any, { auth, models }: any) => {
    const admin = await models.students.findOne({
      where: {
        id: auth.id,
      },
    });
    if (!admin || !admin.is_admin) {
      return new ForbiddenError('You need higher privileges to access this resource');
    } else {
      return skip;
    }
  },
);
