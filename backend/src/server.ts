import http from 'http'
import express from 'express'
import { gql } from 'apollo-server'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import { applyExpressMiddlewares } from './server/middleware'
import { applyExpressRouter } from './server/router'

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
]

const resolvers = {
  Query: {
    books: () => books,
  },
}

export async function start() {
  const APP_PORT = Number(process.env.APP_PORT)
  const port = isNaN(APP_PORT) ? 4000 : APP_PORT

  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    introspection: process.env.NODE_ENV !== 'production',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  })

  applyExpressMiddlewares(app)
  applyExpressRouter(app)

  await server.start()
  server.applyMiddleware({
    app,
    path: '/graphql',
  })

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))

  return `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
}
