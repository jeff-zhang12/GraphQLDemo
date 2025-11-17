import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
    project(id: Int!): Project!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
  },
};

async function start() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`GraphQL server at ${url}`);
}

start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exitCode = 1;
});


