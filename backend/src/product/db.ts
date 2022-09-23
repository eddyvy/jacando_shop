import { Schema, model } from 'mongoose'
import { ProductDb } from './types'

export const PRODUCTS_COLLECTION = 'products'

const productsDbSchema = new Schema<ProductDb>({
  id: { type: Number, index: true, unique: true, require: true },
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  stock: { type: Number, min: 0 },
  image: { type: String, required: true },
  isLocal: Boolean,
  waterPct: Number,
  smellLevel: Number,
})

export const productsModel = model(PRODUCTS_COLLECTION, productsDbSchema)
