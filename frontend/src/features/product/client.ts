import { gql } from '@apollo/client'

export const GET_CHEESES = gql`
  query CheesesQuery($offset: Int!, $limit: Int!) {
    cheeses(offset: $offset, limit: $limit) {
      id
      category
      name
      price
      description
      stock
      image
      smellLevel
    }
  }
`

export const GET_FRUITS = gql`
  query FruitsQuery($offset: Int!, $limit: Int!) {
    fruits(offset: $offset, limit: $limit) {
      id
      category
      name
      price
      description
      stock
      image
      waterPct
    }
  }
`

export const GET_VEGETABLES = gql`
  query VegetablesQuery($offset: Int!, $limit: Int!) {
    vegetables(offset: $offset, limit: $limit) {
      id
      category
      name
      price
      description
      stock
      image
      isLocal
    }
  }
`
