import { productsModel } from '../product'
import { ordersModel } from './db'
import { Order, OrderDbInput } from './types'

export async function createOrder(orderInput: OrderDbInput): Promise<Order> {
  const createdOrder = new ordersModel(orderInput)
  return await createdOrder.save()
}

export async function createOrderFromProductIds(pIds: number[]) {
  const lastOrder = await ordersModel.findOne().sort({ id: -1 })
  const id =
    lastOrder && typeof lastOrder.id === 'number' ? lastOrder.id + 1 : 1

  const productsDocuments = await productsModel
    .find()
    .where({ id: { $in: pIds } })

  const quantitiesMap: Record<number, number> = {}

  pIds.forEach((id) => {
    if (quantitiesMap[id]) {
      quantitiesMap[id]++
    } else {
      quantitiesMap[id] = 1
    }
  })

  const products = productsDocuments.map(
    (p): OrderDbInput['products'][number] => {
      if (quantitiesMap[p.id] > p.stock)
        throw new Error(`Not enough '${p.name}' in stock!`)

      return {
        product: p,
        quantity: quantitiesMap[p.id],
      }
    },
  )

  const price = products.reduce((a, b) => a + b.product.price * b.quantity, 0)

  return createOrder({
    id,
    products,
    price,
  })
}

export async function readOrders() {
  return await ordersModel.find().populate('products.product').exec()
}
