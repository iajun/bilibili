/*
 * @Date: 2020-03-23 19:57:21
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-23 22:09:47
 */
const { ApolloClient } = require('apollo-client');
const { createHttpLink } = require('apollo-link-http');
const fetch = require('node-fetch');
const { InMemoryCache } = require('apollo-cache-inmemory');

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: 'http://localhost:3021/graphql',
    credentials: 'same-origin',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetch,
  }),
  cache: new InMemoryCache(),
});

export default client;
