import { gql } from 'apollo-server'
import { fruitFixtures } from './fixtures'

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
    fruits(offset: number, limit: number) {
      console.log(offset, limit)
      return fruitFixtures
    },
  },
}
