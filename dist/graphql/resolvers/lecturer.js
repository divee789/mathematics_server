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
const graphql_resolvers_1 = require("graphql-resolvers");
const authorization_1 = require("./authorization");
exports.default = {
    Query: {
        lecturers: graphql_resolvers_1.combineResolvers(authorization_1.isSuperAdmin, (parent, args, { models }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield models.lecturers.findAll();
        })),
        lecturer: graphql_resolvers_1.combineResolvers(authorization_1.isAuthenticated, (parent, { id }, { models }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield models.lecturer.findOne({
                where: {
                    id,
                },
            });
        })),
        lecturer_courses: graphql_resolvers_1.combineResolvers(authorization_1.isAuthenticated, (parent, { id }, { models }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield models.courses.findAll({
                where: {
                    lecturerId: id,
                },
            });
        })),
    },
    Mutation: {
        updateLecturer: graphql_resolvers_1.combineResolvers(authorization_1.isSuperAdmin, (parent, { id, first_name, last_name, email, title, position, department }, { models }) => __awaiter(void 0, void 0, void 0, function* () {
            const lecturer = yield models.lecturers.findByPk(id);
            if (!lecturer)
                throw new apollo_server_1.ApolloError('This lecturer does not exist in our database', '404');
            lecturer.first_name = first_name;
            lecturer.last_name = last_name;
            lecturer.email = email;
            lecturer.title = title;
            lecturer.position = position;
            lecturer.department = department;
            yield lecturer.save();
            return { message: 'Lecturer Updated Successfully' };
        })),
    },
};
