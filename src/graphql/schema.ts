import { gql } from 'apollo-server'
import User, { UsersDocument } from './types/users'
import { DataSources } from './mongo-data-source'
import { ObjectId } from 'mongodb'

const Query = gql`
  type DeleteResult {
    acknowledged: Boolean!
    deletedCount: Int!
  }
  
  type Query {
    getUser(_id: ID) : User
    getUsers: [User!]
  }
  
  type Mutation {
    addUser(
      user: NewUser!
    ): User
  }
`;

export const typeDefs = [Query, User]
export const resolvers = {
  Query: {
    getUser: async (_:any, {userId}:{userId: ObjectId}, {dataSources}:{dataSources:DataSources}) => {
      return dataSources.users.getUser(userId);
    },
    getUsers: async (_:any, __:any, {dataSources}:{dataSources:DataSources}) => {
      return dataSources.users.getUsers();
    },
  },
  Mutation: {
    addUser: async (_:any, {user}:{user: UsersDocument}, {dataSources}:{dataSources:DataSources}) => {
      const res = await dataSources.users.addUser(user);
      return res;
    },
  },
};

