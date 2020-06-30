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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apollo_server_1 = require("apollo-server");
const graphql_resolvers_1 = require("graphql-resolvers");
const authorization_1 = require("./authorization");
const constants_1 = require("../../core/constants");
const createToken = (student) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = student;
    return yield jsonwebtoken_1.default.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: '50m',
    });
});
exports.default = {
    Query: {
        students: graphql_resolvers_1.combineResolvers(authorization_1.isSuperAdmin, (parent, args, { models }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield models.students.findAll();
        })),
        student: graphql_resolvers_1.combineResolvers(authorization_1.isAuthenticated, (parent, args, { student }) => __awaiter(void 0, void 0, void 0, function* () {
            return student;
        })),
        student_courses: graphql_resolvers_1.combineResolvers(authorization_1.isAuthenticated, (parent, args, { models, auth }) => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield models.students.findOne({
                where: {
                    id: auth.id,
                },
                include: [
                    {
                        model: models.courses,
                        as: 'courses',
                        through: {
                            model: models.course_students,
                            as: 'student_grade',
                            attributes: ['grade'],
                        },
                    },
                ],
            });
            console.log(result.courses.student_grade);
            return result;
        })),
        studentsByYear: graphql_resolvers_1.combineResolvers(authorization_1.isAuthenticated, (parent, args, { models, student }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield models.students.findAll({
                where: {
                    level: student.level,
                },
            });
        })),
    },
    Mutation: {
        signUp: (parent, { first_name, last_name, matriculation_number, level, password, department, is_admin, }, { models }) => __awaiter(void 0, void 0, void 0, function* () {
            const duplicate = yield models.students.findOne({
                where: {
                    matriculation_number,
                },
            });
            if (duplicate)
                throw new apollo_server_1.AuthenticationError('This student already exists');
            const student = yield models.students.create({
                first_name,
                last_name,
                matriculation_number,
                level,
                password,
                department,
                is_admin: is_admin ? true : false,
            });
            return { token: createToken(student) };
        }),
        logIn: (parent, { matriculation_number, password }, { models }) => __awaiter(void 0, void 0, void 0, function* () {
            const student = yield models.students.findOne({
                where: {
                    matriculation_number,
                },
            });
            if (!student) {
                throw new apollo_server_1.UserInputError('Invalid login credentials.');
            }
            const isValid = yield student.validatePassword(password);
            if (!isValid) {
                throw new apollo_server_1.AuthenticationError('Invalid login credentials');
            }
            return { token: createToken(student) };
        }),
        editProfile: graphql_resolvers_1.combineResolvers(authorization_1.isAuthenticated, (parent, { first_name, last_name, matriculation_number, level, department }, { student }) => __awaiter(void 0, void 0, void 0, function* () {
            student.first_name = first_name;
            student.last_name = last_name;
            student.matriculation_number = matriculation_number;
            student.level = level;
            student.department = department;
            yield student.save();
            return student;
        })),
        addCourse: graphql_resolvers_1.combineResolvers(authorization_1.isAuthenticated, (parent, { course_id }, { models, student }) => __awaiter(void 0, void 0, void 0, function* () {
            const course = yield models.courses.findOne({
                where: {
                    id: course_id,
                },
            });
            if (!course) {
                throw new apollo_server_1.ApolloError('This course does not exist', constants_1.NOTFOUND);
            }
            yield student.addCourse(course);
            return { message: 'Course added successfully' };
        })),
        removeCourse: graphql_resolvers_1.combineResolvers(authorization_1.isAuthenticated, (parent, { course_id }, { models, student }) => __awaiter(void 0, void 0, void 0, function* () {
            const course = yield models.courses.findOne({
                where: {
                    id: course_id,
                },
            });
            if (!course) {
                throw new apollo_server_1.ApolloError('This course does not exist', constants_1.NOTFOUND);
            }
            yield student.removeCourse(course);
            return true;
        })),
    },
};
