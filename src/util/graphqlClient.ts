/*
 * @Date: 2020-03-23 19:57:21
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-24 11:33:46
 */
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';

const client = new ApolloClient({
  ssrMode: true,
  link: createHttpLink({
    uri: 'http://localhost:3021/graphql',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetch: fetch as any,
  }),
  cache: new InMemoryCache(),
});

export default client;
