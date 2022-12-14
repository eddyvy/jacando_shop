import { gql } from 'apollo-server'
import { readCheeses } from './service'

export const cheesesDef = gql`
  type Query {
    cheeses(offset: Int!, limit: Int!): [Cheese]
  }

  type Cheese implements Product {
    id: Int!
    category: Category!
    name: String!
    price: Float!
    description: String!
    stock: Int!
    image: String!
    smellLevel: Int!
  }
`

export const cheesesRes = {
  Query: {
    cheeses(_, { offset, limit }: { offset: number; limit: number }) {
      return readCheeses(offset, limit)
    },
  },
}
