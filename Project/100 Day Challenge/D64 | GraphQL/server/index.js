const { ApolloServer, PubSub } = require("apollo-server");
require("./config/database.config copy");

const Post = require("./models/Post");
const User = require("./models/Post");
const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});
// context now has req.body and enable to pass the logged-in user nfo

server.listen({ port: 5000 }).then((res) => {
  console.log(`Server running on ${res.url}`);
});
