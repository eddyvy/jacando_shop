import { Document } from 'mongoose'
import {
  Category,
  Product,
  productsModel,
  PRODUCTS_COLLECTION,
} from '../product'
import { ordersModel } from './db'
import { Order } from './types'

export async function createOrder(
  order: Omit<Order, 'products'> & { products: (Document & Product)[] },
) {
  const createdOrder = new ordersModel(order)
  return await createdOrder.save()
}

export async function createOrderFromProductIds(pIds: number[]) {
  const lastOrder = await ordersModel.findOne().sort({ id: -1 })
  const id = lastOrder ? lastOrder.id + 1 : 1

  const productsDocuments = await productsModel
    .find()
    .where({ id: { $in: pIds } })

  const products = productsDocuments.map(
    (p): Omit<Product, 'description' | 'stock'> => ({
      id: p.id,
      category: p.category as Category,
      price: p.price,
      name: p.name,
      image: p.image,
    }),
  )

  const price = products.reduce((a, b) => a + b.price, 0)

  return createOrder({
    id,
    products: productsDocuments,
    price,
  })
}

export async function readOrders() {
  return await ordersModel.find().populate(PRODUCTS_COLLECTION).exec()
}
