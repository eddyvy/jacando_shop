import { gql } from 'apollo-server'

export const ordersDef = gql`
  type Query {
    orders: [Order]
  }

  type Mutation {
    addOrder(products: [Int]!): Order
  }

  type Order {
    id: Int!
    products: [OrderProduct]!
    price: Float!
  }

  type OrderProduct {
    id: Int!
    category: Category!
    name: String!
    price: Float!
    image: String!
  }
`

export const ordersRes = {
  Query: {
    orders() {
      return []
    },
  },
  Mutation: {
    addOrder(...args: any[]) {
      console.log(args)
      return {
        id: 0,
        products: [],
        price: 0,
      }
    },
  },
}
