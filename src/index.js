import '@babel/polyfill'
import { GraphQLServer } from 'graphql-yoga';
import resolvers from './resolvers/index'
import prisma from './prisma'

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context(request) {
        return {
            prisma,
            request
        }
    }
})

// default port for yoga is localhost:4000
server.start({ port: process.env.PORT || 4000 }, () => {
    console.log('The server is up!')
})