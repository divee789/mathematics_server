import jwt from 'jsonwebtoken';
import { AuthenticationError, UserInputError } from 'apollo-server';

const createToken = async (student: any) => {
  const { id } = student;
  return await jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: '30m',
  });
};

export default {
  Query: {
    students: async (parent: any, args: any, { models }: any) => {
      return await models.students.findAll();
    },
    student: async (parent: any, { id }: { id: string }, { models }: any) => {
      return await models.students.findByPk(id);
    },
    student_courses: async (student: any, args: any, { models }: any) => {
      return await models.course_students.findAll({
        where: {
          student_id: student.id,
        },
        include: [
          {
            model: models.courses,
            as: 'courses',
          },
        ],
      });
    },
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
        is_admin
      }: {
        first_name: string;
        last_name: string;
        matriculation_number: string;
        level: number;
        password: string;
        department: string;
        is_admin: boolean;
      },
      { models }: any,
    ) => {
      const student = await models.students.create({
        first_name,
        last_name,
        matriculation_number,
        level,
        password,
        department,
        is_admin
      });

      return { token: createToken(student) };
    },

    logIn: async (
      parent: any,
      { matriculation_number, password }: { matriculation_number: string; password: string },
      { models }: any,
    ) => {
      const student = await models.students.findOne({
        where:{
          matriculation_number
        }
      })

      if (!student) {
        throw new UserInputError('No user found with this login credentials.');
      }

      const isValid = await student.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }

      return { token: createToken(student) };
    },
  },
};
