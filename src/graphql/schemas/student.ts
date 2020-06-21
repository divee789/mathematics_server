import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    student: Student!
    students: [Student]!
    student_courses: studentCourses!
    studentsByYear: [Student]!
  }

  extend type Mutation {
    signUp(
      first_name: String!
      last_name: String!
      matriculation_number: String!
      level: Int!
      password: String!
      department: String!
      is_admin: Boolean
    ): Token!

    logIn(matriculation_number: String!, password: String!): Token!

    editProfile(
      first_name: String!
      last_name: String!
      matriculation_number: String!
      level: Int!
      department: String!
    ): Student!

    addCourse(course_id: ID!): Message!

    removeCourse(course_id: ID!): Boolean

    updateStudent: Student

    deleteStudent(id: ID!): Boolean
  }

  type Token {
    token: String!
  }

  type Message {
    message: String!
  }

  type studentCourses {
    courses: [Course]!
  }

  type Student {
    id: ID!
    first_name: String!
    last_name: String!
    matriculation_number: String!
    email: String
    level: Int!
    phone_number: String
    profile_image: String
    department: String
    email_verified: Boolean
    phone_number_verified: Boolean
  }
`;
