import { gql } from 'apollo-server-express';
 
export default gql`
  extend type Query {
    me: Student
  }

  type Student {
    first_name: String!
    last_name: String!
    matriculation_number: String!
    email: String!
    level: Int!
    phone_number: String
    profile_image: String
    department: String
    email_verified: Boolean
    phone_number_verified: Boolean
  }
`;