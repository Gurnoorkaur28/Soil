// Some Code/concept taken from RMIT - COSC2758 Wk11 Lec Code
require("dotenv").config();

// Using Apollo server express.
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");

// Added for subscription suppoort.
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");

// GraphQL schema and resolvers.
const { typeDefs, resolvers } = require("./src/graphql");

const db = require("./src/database");

async function startApolloServer(typeDefs, resolvers) {
  const app = express();
  const httpServer = http.createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Setup GraphQL subscription server.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  /**
   * Passing in an instance of a GraphQLSchema and
   * telling the WebSocketServer to start listening.
   */
  const serverCleanup = useServer({ schema }, wsServer);

  /**
   * Setup Apollo server
   * Include plugin code to ensure all HTTP and subscription connections closed when the server is shutting down.
   */
  const server = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),

      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await server.start();
  server.applyMiddleware({ app });

  const PORT = process.env.ADMIN_PORT || 4001;
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  );
}

startApolloServer(typeDefs, resolvers);
