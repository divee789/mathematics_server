"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const graphql_resolvers_1 = require("graphql-resolvers"); // This is our middleware
exports.isAuthenticated = (parent, args, { auth, student }) => __awaiter(void 0, void 0, void 0, function* () {
    if (auth) {
        if (!student) {
            throw new apollo_server_1.AuthenticationError('Access Denied to non existing user');
        }
        return graphql_resolvers_1.skip;
    }
    else {
        throw new apollo_server_1.AuthenticationError('Access Denied, no token found');
    }
});
exports.isAdmin = graphql_resolvers_1.combineResolvers(exports.isAuthenticated, (parent, args, { student }) => __awaiter(void 0, void 0, void 0, function* () {
    if (!student.is_admin) {
        throw new apollo_server_1.ForbiddenError('You need higher privileges to run this query');
    }
    else {
        return graphql_resolvers_1.skip;
    }
}));
exports.isSuperAdmin = graphql_resolvers_1.combineResolvers(exports.isAdmin, (parent, args, { student }) => __awaiter(void 0, void 0, void 0, function* () {
    if (student.admin_level < 5) {
        throw new apollo_server_1.ForbiddenError('You need God Mode privileges to run this query');
    }
    else {
        return graphql_resolvers_1.skip;
    }
}));
