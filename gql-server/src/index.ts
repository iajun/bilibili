/*
 * @Date: 2020-03-18 21:02:46
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-19 23:11:19
 */
import express from 'express';
import fs from 'fs';
import { ApolloServer, gql } from 'apollo-server-express';
import { resolveFromSrc } from '@util/resolvePath';
import Query from './gql/query';

const port = 3021;

const schema = fs.readFileSync(resolveFromSrc('gql/schema.graphql'), 'utf-8');

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
