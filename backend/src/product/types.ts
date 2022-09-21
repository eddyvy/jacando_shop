import { PRODUCT_CATEGORIES } from './constants'

export type Category = typeof PRODUCT_CATEGORIES[number]

export type Product = {
  id: number
  category: Category
  price: number
  name: string
  description: string
  stock: number
  image: string
}
