/*
 * @Date: 2020-03-18 21:02:46
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-19 20:54:28
 */
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const port = 3021;

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Now browse to http://localhost:${port}` + server.graphqlPath),
);

throw new Error('ddd');
