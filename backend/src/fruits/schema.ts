import { gql } from 'apollo-server'
import { readFruits } from './service'

export const fruitsDef = gql`
  type Query {
    fruits(offset: Int!, limit: Int!): [Fruit]
  }

  type Fruit implements Product {
    id: Int!
    category: Category!
    name: String!
    price: Float!
    description: String!
    stock: Int!
    image: String!
    waterPct: Float!
  }
`

export const fruitsRes = {
  Query: {
    fruits(_, { offset, limit }: { offset: number; limit: number }) {
      return readFruits(offset, limit)
    },
  },
}
