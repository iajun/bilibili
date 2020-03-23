/*
 * @Date: 2020-03-23 19:57:21
 * @Author: Sharp
 * @LastEditors: Sharp
 * @LastEditTime: 2020-03-23 22:08:15
 */
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const client = new ApolloClient({
  link: createHttpLink({
    uri: 'http://localhost:3021/graphql',
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__),
});

export default client;
