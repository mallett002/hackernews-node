const {GraphQLServer} = require('graphql-yoga');
const {prisma} = require('./src/generated/prisma-client');

const resolvers = {
    Query: {
        info: () => `This is the API of Hackernews Clone`,
        feed: (root, args, context, info) => {
            return context.prisma.links();
        },
        link: (parent, args) => links.find(({id}) => id === args.id)
    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description
            });
        },
        updateLink: (parent, args) => {
            const index = links.findIndex(({id}) => id === args.id);
            const updatedLink = {
                id: args.id,
                description: args.description || links[index].description,
                url: args.url || links[index].url,
            };

            links[index] = updatedLink;
            
            return updatedLink;
        },
        deleteLink: (parent, args) => {
            const index = links.findIndex(({id}) => id === args.id);
            const [linkToDelete] = links.splice(index, 1);

            return linkToDelete;
        }
    }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: {prisma}
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
