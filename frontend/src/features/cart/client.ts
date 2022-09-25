import { gql } from '@apollo/client'

export const CREATE_ORDER = gql`
  mutation CreateOrderMutation($products: [Int]!) {
    addOrder(products: $products) {
      id
      products {
        product {
          id
          category
          name
          price
          image
        }
        quantity
      }
      price
    }
  }
`
