import { Product } from '../product'

export type CartState = {
  products: Product[]
  price: number
}

export type Order = {
  id: number
  products: Product[]
  price: number
}
