import { ObjectId } from 'mongodb'
import { gql } from 'apollo-server';

export default gql`
  type User{
    _id: ID
    name: String!
  }
  
  input NewUser{
    name: String
  }
  
  input UserInput{
    _id: ID
    name: String
  }
  
  input UserFilterInput{
    filter: UserFilter
  }
  
  input UserFilter{
    _id: ID
    name: String
  }
`;

export interface UsersDocument {
  _id: ObjectId
  name: string
}
