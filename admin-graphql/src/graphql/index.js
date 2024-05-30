// Some Code/concept taken from RMIT - COSC2758 Wk10 Prac Code
const { buildSchema } = require("graphql");
const db = require("../database");

const graphql = {};

// Construct a schema, using GraphQL schema language
graphql.schema = buildSchema(`
  #GraphQL types

  # user schema id, email ... fields corrospond to coloums in sequilizer model
  # ! indicates they are non-nullable.

  type User {
    id: ID!
    email: String!
    password_hash: String!
    full_name: String!
    join_date: String!
  }

  
  # Queries
  type Query {
    all_users: [User]
  }

  # Mutations




`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
  all_users: async () => {
    return await db.user.findAll();
  },
};

module.exports = graphql;
