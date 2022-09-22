import { Schema, model } from 'mongoose'

export const CHEESES_COLLECTION = 'cheeses'

const cheesesDbSchema = new Schema({
  id: { type: Number, index: true, unique: true },
  category: String,
  name: String,
  price: Number,
  description: String,
  stock: { type: Number, min: 0 },
  image: String,
  smellLevel: { type: Number, min: 0, max: 5 },
})

export const cheesesModel = model(CHEESES_COLLECTION, cheesesDbSchema)
