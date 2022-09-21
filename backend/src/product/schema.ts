import { gql } from 'apollo-server'

export const productDef = gql`
  interface Product {
    id: Int!
    name: String!
    price: Float!
    description: String!
    stock: Int!
    image: String!
  }
`
