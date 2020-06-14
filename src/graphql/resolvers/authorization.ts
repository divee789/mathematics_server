import { ForbiddenError, AuthenticationError } from 'apollo-server';
import { skip, combineResolvers } from 'graphql-resolvers'; // This is our middleware

export const isAuthenticated = async (parent: any, args: any, { auth, student }: any) => {
  if (auth) {
    if (!student) {
      throw new AuthenticationError('Access Denied to non existing user');
    }
    return skip;
  } else {
    throw new AuthenticationError('Access Denied, no token found');
  }
};

export const isAdmin = combineResolvers(
  isAuthenticated,
  async (parent: any, args: any, { student }: any) => {
    if (!student.is_admin) {
      throw new ForbiddenError('You need higher privileges to run this query');
    } else {
      return skip;
    }
  },
);

export const isSuperAdmin = combineResolvers(
  isAdmin,
  async (parent: any, args: any, { student }: any) => {
    if (student.admin_level < 5) {
      throw new ForbiddenError('You need higher privileges to run this query');
    } else {
      return skip;
    }
  },
);
