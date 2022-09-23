import { GraphQLSchema } from 'graphql/type/schema'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { mergeSchemas } from '@graphql-tools/schema'
import { cheesesDef, cheesesRes } from '../cheese'
import { fruitsDef, fruitsRes } from '../fruits'
import { ordersDef, ordersRes } from '../order'
import { productDef } from '../product'
import { vegetablesDef, vegetablesRes } from '../vegetable'

const typeDefs = mergeTypeDefs([
  cheesesDef,
  fruitsDef,
  ordersDef,
  productDef,
  vegetablesDef,
])

const resolvers = mergeResolvers([
  cheesesRes,
  fruitsRes,
  ordersRes,
  vegetablesRes,
])

export const appSchema: GraphQLSchema = mergeSchemas({
  typeDefs,
  resolvers,
})
