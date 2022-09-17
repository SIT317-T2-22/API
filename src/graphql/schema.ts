import { gql } from 'apollo-server'
import User, { UsersDocument } from './types/users'
import { DataSources } from './mongo-data-source'
import { ObjectId } from 'mongodb'

const Query = gql`
  type Query {
    getUser(_id: ID) : OutUser
    getUsers: [OutUser!]
    signIn(email: String!, password: String!) : Boolean
  }
  
  type Mutation {
    addUser(
      user: NewUser!
    ): OutUser
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
    signIn: async (_:any, {email, password}:{email: string, password: string}, {dataSources}:{dataSources:DataSources}) => {
      return dataSources.users.signIn(email, password);
    },
  },
  Mutation: {
    addUser: async (_:any, {user}:{user: UsersDocument}, {dataSources}:{dataSources:DataSources}) => {
      const res = await dataSources.users.addUser(user);
      return res;
    },
  },
};
