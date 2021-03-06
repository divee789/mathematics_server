import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    lecturer(id: ID!): Lecturer!
    lecturers: [Lecturer]!
    lecturer_courses(id: ID!): [Course]!
  }

  extend type Mutation {
    createLecturer(
      first_name: String!
      last_name: String!
      phone_number: String
      email: String
    ): Lecturer!

    updateLecturer(
      first_name: String!
      last_name: String!
      phone_number: String
      email: String
      title: String
      department: String
      position: String
    ): Lecturer!

    deleteLecturer(id: ID!): Boolean!
  }

  type Lecturer {
    id: ID!
    first_name: String!
    last_name: String!
    email: String
    position: String
    title: String!
    department: String
    phone_number: String
    profile_image: String
  }
`;
