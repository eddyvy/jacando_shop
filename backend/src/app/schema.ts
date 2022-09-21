import { GraphQLSchema } from 'graphql/type/schema'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { mergeSchemas } from '@graphql-tools/schema'
import { productDef } from '../product'
import { vegetablesDef, vegetablesRes } from '../vegetable'
import { fruitsDef, fruitsRes } from '../fruits'

const typeDefs = mergeTypeDefs([productDef, fruitsDef, vegetablesDef])

const resolvers = mergeResolvers([fruitsRes, vegetablesRes])

export const appSchema: GraphQLSchema = mergeSchemas({
  typeDefs,
  resolvers,
})
