/*
 * @Date: 2020-03-18 21:02:46
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-24 14:45:46
 */
import * as resolvers from './gql/resolver';
import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import schema from './gql/schema.gql';

const port = 3021;

const typeDefs = gql`
  ${schema}
`;

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port }, () =>
  console.log(`Now browse to http://localhost:${port}` + server.graphqlPath),
);
