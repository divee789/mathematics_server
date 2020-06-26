import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError, ApolloError } from 'apollo-server';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated, isSuperAdmin } from './authorization';
import { NOTFOUND, DUPLICATE } from '../../core/constants';

const createToken = async (student: any) => {
  const { id } = student;
  return await jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: '50m',
  });
};

export default {
  Query: {
    students: combineResolvers(isSuperAdmin, async (parent: any, args: any, { models }: any) => {
      return await models.students.findAll();
    }),
    student: combineResolvers(isAuthenticated, async (parent: any, args: any, { student }: any) => {
      return student;
    }),
    student_courses: combineResolvers(
      isAuthenticated,
      async (parent: any, args: any, { models, auth }: any) => {
        const result = await models.students.findOne({
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
      },
    ),
    studentsByYear: combineResolvers(
      isAuthenticated,
      async (parent: any, args: any, { models, student }: any) => {
        return await models.students.findAll({
          where: {
            level: student.level,
          },
        });
      },
    ),
  },

  Mutation: {
    signUp: async (
      parent: any,
      {
        first_name,
        last_name,
        matriculation_number,
        level,
        password,
        department,
        is_admin,
      }: {
        first_name: string;
        last_name: string;
        matriculation_number: string;
        level: number;
        password: string;
        department: string;
        is_admin?: boolean;
      },
      { models }: any,
    ) => {
      const duplicate = await models.students.findOne({
        where: {
          matriculation_number,
        },
      });
      if (duplicate) throw new AuthenticationError('This student already exists');
      const student = await models.students.create({
        first_name,
        last_name,
        matriculation_number,
        level,
        password,
        department,
        is_admin: is_admin ? true : false,
      });

      return { token: createToken(student) };
    },

    logIn: async (
      parent: any,
      { matriculation_number, password }: { matriculation_number: string; password: string },
      { models }: any,
    ) => {
      const student = await models.students.findOne({
        where: {
          matriculation_number,
        },
      });

      if (!student) {
        throw new UserInputError('Invalid login credentials.');
      }

      const isValid = await student.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid login credentials');
      }

      return { token: createToken(student) };
    },

    editProfile: combineResolvers(
      isAuthenticated,
      async (
        parent: any,
        { first_name, last_name, matriculation_number, level, department },
        { student },
      ) => {
        student.first_name = first_name;
        student.last_name = last_name;
        student.matriculation_number = matriculation_number;
        student.level = level;
        student.department = department;
        await student.save();
        return student;
      },
    ),

    addCourse: combineResolvers(
      isAuthenticated,
      async (parent: any, { course_id }: { course_id: string }, { models, student }: any) => {
        const course = await models.courses.findOne({
          where: {
            id: course_id,
          },
        });
        if (!course) {
          throw new ApolloError('This course does not exist', NOTFOUND);
        }
        await student.addCourse(course);
        return { message: 'Course added successfully' };
      },
    ),

    removeCourse: combineResolvers(
      isAuthenticated,
      async (parent: any, { course_id }: { course_id: string }, { models, student }: any) => {
        const course = await models.courses.findOne({
          where: {
            id: course_id,
          },
        });
        if (!course) {
          throw new ApolloError('This course does not exist', NOTFOUND);
        }
        await student.removeCourse(course);
        return true;
      },
    ),
  },
};
