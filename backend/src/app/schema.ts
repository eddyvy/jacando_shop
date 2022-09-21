import { GraphQLSchema } from 'graphql/type/schema'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { mergeSchemas } from '@graphql-tools/schema'
import { vegetablesDef, vegetablesRes } from '../vegetable'
import { productDef } from '../product'

const typeDefs = mergeTypeDefs([productDef, vegetablesDef])

const resolvers = mergeResolvers([vegetablesRes])

export const appSchema: GraphQLSchema = mergeSchemas({
  typeDefs,
  resolvers,
})
