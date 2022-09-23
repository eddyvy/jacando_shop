import { Document } from 'mongoose'
import { Cheese } from '../cheese'
import { Fruit } from '../fruits'
import { Vegetable } from '../vegetable'
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

export type ProductDb = Product &
  Partial<Omit<Vegetable, keyof Product>> &
  Partial<Omit<Fruit, keyof Product>> &
  Partial<Omit<Cheese, keyof Product>>

export type ProductDocument = Document & ProductDb
