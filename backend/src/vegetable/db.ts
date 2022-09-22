import { Schema, model } from 'mongoose'

export const VEGETABLES_COLLECTION = 'vegetables'

const vegetablesDbSchema = new Schema({
  id: { type: Number, index: true, unique: true },
  category: String,
  name: String,
  price: Number,
  description: String,
  stock: { type: Number, min: 0 },
  image: String,
  isLocal: Boolean,
})

export const vegetablesModel = model(VEGETABLES_COLLECTION, vegetablesDbSchema)
