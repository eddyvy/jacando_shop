import { Schema, model } from 'mongoose'

export const FRUITS_COLLECTION = 'fruits'

const fruitsDbSchema = new Schema({
  id: { type: Number, index: true, unique: true },
  category: String,
  name: String,
  price: Number,
  description: String,
  stock: { type: Number, min: 0 },
  image: String,
  waterPct: { type: Number, min: 0, max: 100 },
})

export const fruitsModel = model(FRUITS_COLLECTION, fruitsDbSchema)
