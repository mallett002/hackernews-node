const {GraphQLServer} = require('graphql-yoga');

// Dummy Data to start with
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }];

let idCount = links.length;

const resolvers = {
    Query: {
        info: () => `This is the API of Hackernews Clone`,
        feed: () => links,
        link: (parent, args) => links.find(({id}) => id === args.id)
    },
    Mutation: {
        post: (parent, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            };

            links.push(link);

            return link;
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
    resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
