import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectId } from 'mongodb';
import { UsersDocument } from './types/users';

export interface DataSources {
  users: UsersDataSource
}

export class UsersDataSource extends MongoDataSource<UsersDocument> {
  // Queries
  async getUser(_id: ObjectId) {
    return this.findOneById(_id);
  }
  async getUsers() {
    return this.collection.find().toArray();
  }
  
  // Mutations
  async addUser (user: UsersDocument) {
    // Insert new object, then fetch and return the new object
    return this.collection.insertOne(user)
      .then((response:{insertedId:ObjectId}) => this.getUser(response.insertedId))
    ;
  }
}
