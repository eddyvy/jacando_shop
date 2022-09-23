import { Product } from '../product'

export type Order = {
  id: number
  products: Omit<Product, 'description' | 'stock'>[]
  price: number
}
