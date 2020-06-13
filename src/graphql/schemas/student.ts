import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    student(id: ID!): Student
    students: [Student]
    student_courses: [Course]!
  }

  extend type Mutation {
    signUp(
      first_name: String!
      last_name: String!
      matriculation_number: String!
      level: Int!
      password: String!
      department: String!
      is_admin: Boolean!
    ): Token!

    logIn(matriculation_number: String!, password: String!): Token!
  }

  type Token {
    token: String!
  }

  type Student {
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
