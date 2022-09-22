import { ApolloServer } from 'apollo-server-express'
import { appSchema } from '../../src/app'

export const buildTestServer = () =>
  new ApolloServer({
    schema: appSchema,
  })
