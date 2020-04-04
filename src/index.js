const {GraphQLServer} = require('graphql-yoga');

// GraphQL Schema
const typeDefs = `
    type Query {
        info: String!
    }
`;

// Implementation of the Schema
const resolvers = {
    Query: {
        info: () => `This is the API of Hackernews Clone`
    }
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
