import { ObjectId } from 'mongodb'
import { gql } from 'apollo-server';

export default gql`
  type User{
    _id: ID
    name: String!
    email: String!
    password: String!
  }
  
  input NewUser{
    name: String
    email: String!
    password: String!
  }
  
  type OutUser{
    _id: ID
    name: String
    email: String!
  }
  
  input UserInput{
    _id: ID
    email: String!
    name: String
  }
  
  input UserFilterInput{
    filter: UserFilter
  }
  
  input UserFilter{
    _id: ID
    name: String
    email: String!
  }
`;

export interface UsersDocument {
  _id: ObjectId
  name: string
  email: string
  password: string
}
