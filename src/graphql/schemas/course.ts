import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    courses: [Course!]
    course(id: ID!): Course
    course_students: [Student!]
  }

  extend type Mutation {
    createCourse(title: String!, code: String!, credit_load: Int!, level: Int!): Course!
    deleteCourse(id: ID!): Boolean!
  }

  type Course {
    title: String!
    code: String!
    level: Int!
    credit_load: Int!
  }
`;
