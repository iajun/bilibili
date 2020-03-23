/*
 * @Date: 2020-03-23 19:57:21
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-23 22:05:51
 */
const { ApolloClient } = require('apollo-client');
const { createHttpLink } = require('apollo-link-http');
const { InMemoryCache } = require('apollo-cache-inmemory');

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:3021/graphql',
    credentials: 'same-origin',
  }),
  cache: new InMemoryCache(),
});

export default client;
