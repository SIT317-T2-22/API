import { MongoDataSource } from 'apollo-datasource-mongodb';
import { ObjectId, WithId } from 'mongodb';
import users, { UsersDocument } from './types/users';
import crypto from 'crypto';

export interface DataSources {
  users: UsersDataSource
}

export class UsersDataSource extends MongoDataSource<UsersDocument> {
  // Queries
  async getUser(_id: ObjectId) {
    return this.findOneById(_id);
  }
  async getUserByEmail(email: String) {
    return this.collection.findOne({email});
  }
  async getUsers() {
    return this.collection.find().toArray();
  }
  
  async signIn(email: string, password: string) {
    return this.getUserByEmail(email)
      .then((user) => user?.password === UsersDataSource.hash(password) ?? ".");
  }
  
  // Mutations
  async addUser (user: UsersDocument) {
    return this.collection.findOne({email: user.email}).then((existingUser:WithId<UsersDocument> | null) => {
      if(existingUser) return null; // return null if user already exists
      
      user.password = UsersDataSource.hash(user.password);
      // Insert new object, then fetch and return the new object
      return this.collection.insertOne(user)
        .then((response:{insertedId:ObjectId}) => this.getUser(response.insertedId))
    });
    ;
  }
  
  private static hash(password: string){
    return crypto.createHash('sha1').update(password).digest('hex')
  }
}
