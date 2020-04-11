const {GraphQLServer} = require('graphql-yoga');
const {prisma} = require('./src/generated/prisma-client');

const resolvers = {
    Query: require('./src/resolvers/Query'),
    Mutation: require('./src/resolvers/Mutation'),
    User: require('./src/resolvers/User'),
    Link: require('./src/resolvers/Link')
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: (request) => ({...request, prisma})
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
