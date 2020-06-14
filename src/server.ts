#!/usr/bin/env node

/**
 * Module dependencies.
 */

import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
import app from './app';
import models from './core/database/models';
import schema from './graphql/schemas';
import resolvers from './graphql/resolvers';
import logger from './core/utilities/logger';

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3100');
app.set('port', port);

/**
 * Create Apollo server.
 */

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: async ({ req }: any) => {
    let auth: any;
    let student: any;
    const authorization: string = req.headers.authorization;
    const authParams = authorization?.split(' ');
    if (authParams) {
      const authType = authParams[0];
      const authToken = authParams[1];
      if (authToken && authType.toLowerCase() === 'bearer') {
        try {
          auth = await jwt.verify(authToken, process.env.TOKEN_SECRET);
          student = await models.students.findOne({
            where: {
              id: auth.id,
            },
          });
        } catch (e) {
          throw new AuthenticationError('Your session expired. Sign in again.');
        }
      }
    }

    return { models, auth, student };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

/**
 * Listen on provided port, on all network interfaces.
 */

models.sequelize
  .authenticate()
  .then(() => {
    logger.info('MYSQL Connection has been established successfully');
    app.listen({ port }, () => {
      logger.info('Apollo server started on port ' + port);
    });

    // course.getStudent
    // film.setFestival
    // film.addFestival
    // film.addFestivals
  })
  .catch((err: any) => {
    logger.error('Unable to connect to the database:', err);
    return;
  });

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val: string) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
