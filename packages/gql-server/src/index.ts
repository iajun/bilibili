/*
 * @Date: 2020-03-18 21:02:46
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-22 11:32:30
 */
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as apolloServer from 'apollo-server-express';
import Query from './gql/query';

const SCHEMA_PATH = path.resolve(__dirname, './gql/schema.gql');

const { ApolloServer, gql } = apolloServer;

const port = 3021;

const schema = fs.readFileSync(SCHEMA_PATH, 'utf-8');

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
