const {GraphQLServer} = require('graphql-yoga');

// Dummy Data
let links = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for GraphQL'
  }];

let idCount = links.length;

// Implementation of the Schema
const resolvers = {
    Query: {
        info: () => `This is the API of Hackernews Clone`,
        feed: () => links
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
        }
    }
    
    // Can remove the Link. GraphQL infers what this looks like
    // Link: {
    //     id: (parent) => parent.id,
    //     description: (parent) => parent.description,
    //     url: (parent) => parent.url
    // }
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
