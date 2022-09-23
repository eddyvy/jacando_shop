import { gql } from 'apollo-server'
import { createOrderFromProductIds, readOrders } from './service'

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
    product: OrderProductSingle
    quantity: Int!
  }

  type OrderProductSingle {
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
      return readOrders()
    },
  },
  Mutation: {
    addOrder(_, { products }) {
      return createOrderFromProductIds(products)
    },
  },
}
