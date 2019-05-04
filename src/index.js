import { GraphQLServer, PubSub } from 'graphql-yoga';
import Query from './resolvers/Query'
import User from './resolvers/User'
import Post from './resolvers/Post'
import Comment from './resolvers/Comment'
import Subscription from './resolvers/Subscription'
import prisma from './prisma'


const pubsub = new PubSub()

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        User,
        Post,
        Comment,
        Subscription
    },
    context: {
        pubsub,
        prisma
    }
})

// default port for yoga is localhost:4000
server.start(() => {
    console.log("The server is up!");
})