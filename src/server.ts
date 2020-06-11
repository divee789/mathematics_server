#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from './app';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schemas';
import resolvers from './graphql/resolvers';

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3100');
app.set('port', port);

/**
 * Create Apollo server.
 */

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

server.applyMiddleware({ app, path: '/graphql' });

/**
 * Listen on provided port, on all network interfaces.
 */

app.listen({ port }, () => {
  console.log('Apollo Server on http://localhost:3100/graphql');
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
