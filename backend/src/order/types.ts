import { Document } from 'mongoose'
import { Product } from '../product'

export type OrderProduct = {
  product: Omit<Product, 'description' | 'stock'>
  quantity: number
}

export type Order = {
  id: number
  products: OrderProduct[]
  price: number
}

export type OrderDbInput = {
  id: number
  products: {
    product: Document & Product
    quantity: number
  }[]
  price: number
}
