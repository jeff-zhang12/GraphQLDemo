import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = /* GraphQL */ `
  type Query {
    hello: String!
    project(id: Int!): Project!
  }

  type Person {
    id: Int!
    name: String!
  }
  
  type Project {
    id: Int!
    client: Person!
    team: String!
    members: [Person!]!
  }

  input PersonInput {
    id: Int!
    name: String!
  }

  type Mutation {
    addProject(client: PersonInput!, team: String!, members: [PersonInput!]!): Project!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'Hello World!',
    project: (parent: any, args: any) => {
      return {
        id: args.id,
        client: {
          id: 0,
          name: 'Kris Jordan',
        },
        team: 'Team C',
        members: [
          {
            id: 1,
            name: 'Jeffrey Zhang',
          },
          {
            id: 2,
            name: 'Christian Lee',
          },
          {
            id: 3,
            name: 'Armaan Punj',
          },
          {
            id: 4,
            name: 'Kamal Vasireddy',
          },
        ],
      };
    },
  },

  Mutation: {
    addProject: (parent: any, args: any) => {
      return {
        id: 2,
        client: {
          id: args.client.id,
          name: args.client.name + ' *created in db*',
        },
        team: args.team,
        members: args.members,
      };
    },
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


