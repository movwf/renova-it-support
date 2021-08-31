/* eslint-disable arrow-body-style */
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const restLink = createHttpLink({
  uri: process.env.REACT_APP_HASURA_URL,
  headers: {
    'x-hasura-admin-secret': process.env.REACT_APP_HASURA_SECRET,
  },
});

const client = new ApolloClient({
  link: restLink,
  cache: new InMemoryCache(),
});

export default client;
