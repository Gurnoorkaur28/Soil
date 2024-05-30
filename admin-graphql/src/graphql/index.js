// Some Code/concept taken from RMIT - COSC2758 Wk10 Prac Code
const { buildSchema } = require("graphql");
const db = require("../database");

const graphql = {};

graphql.schema = buildSchema("");

graphql.root = {};

module.exports = graphql;
