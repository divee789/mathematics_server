import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    courses: [Course!]
    course(id: ID!): Course
    course_students(id: ID!): courseStudents!
  }

  extend type Mutation {
    createCourse(title: String!, code: String!, credit_load: Int!, semester: Int!): Course!
    deleteCourse(id: ID!): Boolean!
    editCourse(id: ID!): Course
    assignLecturer(lecturer_id: ID!, id: ID!): Message!
  }

  type courseStudents {
    students: [Student]!
  }

  type Course {
    id: ID!
    title: String!
    code: String!
    level: Int!
    credit_load: Int!
    semester: Int!
  }
`;
