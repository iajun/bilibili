/*
 * @Date: 2020-03-18 21:02:46
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-20 10:26:48
 */
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import schema from './gql/schema.gql';
import Query from './gql/query';

const port = 3021;

const typeDefs = gql`
  ${schema}
`;

const resolvers = {
  Query,
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Now browse to http://localhost:${port}` + server.graphqlPath),
);
