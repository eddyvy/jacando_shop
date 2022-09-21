import { GraphQLSchema } from 'graphql/type/schema'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { mergeSchemas } from '@graphql-tools/schema'
import { productDef } from '../product'
import { vegetablesDef, vegetablesRes } from '../vegetable'
import { fruitsDef, fruitsRes } from '../fruits'
import { cheesesDef, cheesesRes } from '../cheese'

const typeDefs = mergeTypeDefs([
  cheesesDef,
  fruitsDef,
  productDef,
  vegetablesDef,
])

const resolvers = mergeResolvers([cheesesRes, fruitsRes, vegetablesRes])

export const appSchema: GraphQLSchema = mergeSchemas({
  typeDefs,
  resolvers,
})
