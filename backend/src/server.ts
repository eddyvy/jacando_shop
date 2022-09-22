import http from 'http'
import express from 'express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core'
import { ApolloServer } from 'apollo-server-express'
import { appSchema, applyExpressMiddlewares, applyExpressRouter } from './app'
import { connectDb } from './app/db'

export function buildExpress() {
  const app = express()
  applyExpressMiddlewares(app)
  applyExpressRouter(app)
  return app
}

export async function start() {
  const APP_PORT = Number(process.env.APP_PORT)
  const port = isNaN(APP_PORT) ? 4000 : APP_PORT

  const app = buildExpress()
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

  await connectDb()

  await server.start()

  server.applyMiddleware({
    app,
    path: '/',
  })

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve))

  return `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
}
