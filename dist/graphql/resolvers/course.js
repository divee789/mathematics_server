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
const constants_1 = require("../../core/constants");
exports.default = {
    Query: {
        testApi: (parent, args, { models }) => __awaiter(void 0, void 0, void 0, function* () {
            return { message: ' We are good to go ' };
        }),
        courses: graphql_resolvers_1.combineResolvers(authorization_1.isAuthenticated, (parent, args, { models }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield models.courses.findAll();
        })),
        coursesByLevel: graphql_resolvers_1.combineResolvers(authorization_1.isAuthenticated, (parent, { level }, { models, student }) => __awaiter(void 0, void 0, void 0, function* () {
            const courses = yield models.courses.findAll({
                where: {
                    level,
                },
                include: [
                    {
                        model: models.lecturers,
                        as: 'lecturer',
                    },
                ],
            });
            return courses;
        })),
        course: graphql_resolvers_1.combineResolvers(authorization_1.isAuthenticated, (parent, { id }, { models }) => __awaiter(void 0, void 0, void 0, function* () {
            const course = yield models.courses.findByPk(id);
            if (!course) {
                throw new apollo_server_1.ApolloError('This course does not exist', constants_1.NOTFOUND);
            }
            return course;
        })),
        course_students: graphql_resolvers_1.combineResolvers(authorization_1.isAdmin, (parent, { id }, { models }) => __awaiter(void 0, void 0, void 0, function* () {
            const courseStudents = yield models.courses.findOne({
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
        })),
    },
    Mutation: {
        createCourse: graphql_resolvers_1.combineResolvers(authorization_1.isAdmin, (parent, { title, code, credit_load, semester }, { models, student }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield models.courses.create({
                title,
                code,
                credit_load,
                level: student.level,
                semester,
            });
        })),
        editCourse: graphql_resolvers_1.combineResolvers(authorization_1.isAdmin, (parent, { id, title, code, credit_load, semester }, { models, student }) => __awaiter(void 0, void 0, void 0, function* () {
            const course = yield models.courses.findByPk(id);
            if (!course)
                throw new apollo_server_1.ApolloError('This course does not exist', constants_1.NOTFOUND);
            course.title = title;
            course.code = code;
            course.credit_load = credit_load;
            course.semester = semester;
            yield course.save();
            return course;
        })),
        deleteCourse: graphql_resolvers_1.combineResolvers(authorization_1.isAdmin, (parent, { id }, { models }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield models.courses.destroy({ where: { id } });
        })),
        assignLecturer: graphql_resolvers_1.combineResolvers(authorization_1.isAdmin, (parent, { lecturer_id, id }, { models }) => __awaiter(void 0, void 0, void 0, function* () {
            const lecturer = yield models.lecturers.findOne({
                where: {
                    id: lecturer_id,
                },
            });
            if (!lecturer) {
                throw new apollo_server_1.ApolloError('This lecturer does not exist', constants_1.NOTFOUND);
            }
            const course = yield models.courses.findByPk(id);
            if (!course) {
                throw new apollo_server_1.ApolloError('This course does not exist', constants_1.NOTFOUND);
            }
            yield course.setLecturer(lecturer);
            return { message: 'Lecturer assigned successfully' };
        })),
    },
};
