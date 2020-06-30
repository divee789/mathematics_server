#!/usr/bin/env node
"use strict";
/**
 * Module dependencies.
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_1 = __importDefault(require("./app"));
const models_1 = __importDefault(require("./core/database/models"));
const schemas_1 = __importDefault(require("./graphql/schemas"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const logger_1 = __importDefault(require("./core/utilities/logger"));
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '7001');
app_1.default.set('port', port);
/**
 * Create Apollo server.
 *
 */
const apolloCustomResolvers = resolvers_1.default;
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: schemas_1.default,
    resolvers: apolloCustomResolvers,
    context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
        let auth;
        let student;
        const authorization = req.headers.authorization;
        const authParams = authorization ? authorization.split(' ') : null;
        if (authParams) {
            const authType = authParams[0];
            const authToken = authParams[1];
            if (authToken && authType.toLowerCase() === 'bearer') {
                try {
                    auth = yield jsonwebtoken_1.default.verify(authToken, process.env.TOKEN_SECRET);
                    student = yield models_1.default.students.findOne({
                        where: {
                            id: auth.id,
                        },
                    });
                }
                catch (e) {
                    throw new apollo_server_express_1.AuthenticationError('Your session expired. Sign in again.');
                }
            }
        }
        return { models: models_1.default, auth, student };
    }),
});
server.applyMiddleware({ app: app_1.default, path: '/graphql' });
/**
 * Listen on provided port, on all network interfaces.
 */
models_1.default.sequelize
    .authenticate()
    .then(() => {
    logger_1.default.info('MYSQL Connection has been established successfully');
    app_1.default.listen({ port }, () => {
        logger_1.default.info('Apollo server started on port ' + port);
    });
    // course.getStudent
    // film.setFestival
    // film.addFestival
    // film.addFestivals
})
    .catch((err) => {
    logger_1.default.error('Unable to connect to the database:', err);
    return;
});
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
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
