import { Schema, model } from 'mongoose'

export const ORDERS_COLLECTION = 'orders'

const ordersDbSchema = new Schema({
  id: { type: Number, index: true, unique: true, require: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'products', require: true }],
  price: { type: Number, require: true },
})

export const ordersModel = model(ORDERS_COLLECTION, ordersDbSchema)
