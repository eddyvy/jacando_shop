import { Schema, model } from 'mongoose'
import { Order } from './types'

export const ORDERS_COLLECTION = 'orders'

const ordersDbSchema = new Schema<Order>({
  id: { type: Number, index: true, unique: true, require: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'products', require: true }],
  price: { type: Number, require: true },
})

export const ordersModel = model(ORDERS_COLLECTION, ordersDbSchema)
