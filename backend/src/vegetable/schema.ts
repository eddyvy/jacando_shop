import { gql } from 'apollo-server'
import { vegetableFixtures } from './fixtures'

export const vegetablesDef = gql`
  type Query {
    vegetables(offset: Int!, limit: Int!): [Vegetable]
  }

  type Vegetable implements Product {
    id: Int!
    category: Category!
    name: String!
    price: Float!
    description: String!
    stock: Int!
    image: String!
    isLocal: Boolean!
  }
`

export const vegetablesRes = {
  Query: {
    vegetables(_, { offset, limit }: { offset: number; limit: number }) {
      return vegetableFixtures.slice(offset, limit)
    },
  },
}
