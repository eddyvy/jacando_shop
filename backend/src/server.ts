import http from 'http'
import express from 'express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import { appSchema, applyExpressMiddlewares, applyExpressRouter } from './app'

export async function start() {
  const APP_PORT = Number(process.env.APP_PORT)
  const port = isNaN(APP_PORT) ? 4000 : APP_PORT

  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    schema: appSchema,
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
    path: '/',
  })

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))

  return `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
}
