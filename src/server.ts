import { MongoClient } from 'mongodb'
import { resolvers, typeDefs } from './graphql/schema'
import { UsersDataSource }from './graphql/mongo-data-source'
import { ApolloServer } from 'apollo-server'
import dotenv from 'dotenv';

dotenv.config();

// TODO: Make safe
const MONGO_USERNAME = "root"
const MONGO_PASSWORD = "example"
const MONGO_PORT = 27017
const MONGO_DB = "MYDB"
const MONGO_HOST = process.env.DATABASE_HOST ?? "localhost";

const dbString = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`;
const client = new MongoClient(dbString)
client.connect()
  .then((info) => console.log('Connected to MongoDB'))
  .catch((e) => console.error("Error connecting to MongoDB:", e));

const server = new ApolloServer({
  resolvers: resolvers,
  typeDefs: typeDefs,
  csrfPrevention: true,
  dataSources: () => ({
    users: new UsersDataSource(client.db().collection('users')),
  })
});

// Launch server
server.listen(process.env.PORT ?? 4000).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
