// Some Code/concept taken from RMIT - COSC2758 Wk10 Prac Code
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const db = require("./src/database");
const graphql = require("./src/graphql");

// Database will be sync'ed in the background.
// db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

// Add GraphQL to express server.
// Access to web-interface: http://localhost:8080/graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphql.schema,
    rootValue: graphql.root,
    graphiql: true,
  })
);

// Set port, listen for requests.
const PORT = process.env.ADMIN_PORT || 6000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
