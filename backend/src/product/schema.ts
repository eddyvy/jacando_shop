import { gql } from 'apollo-server'

export const productDef = gql`
  interface Product {
    id: Int!
    category: Category!
    name: String!
    price: Float!
    description: String!
    stock: Int!
    image: String!
  }

  enum Category {
    cheese
    fruit
    vegetable
  }
`
