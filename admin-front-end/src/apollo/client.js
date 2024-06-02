// Some concept of this code/design were taken from RMIT - COSC2758 Wk10 prac Code

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { ApolloClient, InMemoryCache } from "@apollo/client";

const GRAPHQL_ENDPOINT = "ws://localhost:4001/graphql";

const link = new GraphQLWsLink(
  createClient({
    url: GRAPHQL_ENDPOINT,
  })
);

const cache = new InMemoryCache();

const client = new ApolloClient({
  link,
  cache,
});

export default client;
