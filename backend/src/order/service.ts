import { readProductDbByIds, reduceStock } from '../product'
import { ordersModel } from './db'
import { Order, OrderDbInput } from './types'

export async function createOrder(orderInput: OrderDbInput): Promise<Order> {
  const createdOrder = new ordersModel(orderInput)
  return await createdOrder.save()
}

export async function readLastOrderId(): Promise<number> {
  const lastOrder = await ordersModel.findOne().sort({ id: -1 })
  return lastOrder && typeof lastOrder.id === 'number' ? lastOrder.id + 1 : 1
}

export async function createOrderFromProductIds(pIds: number[]) {
  const id = await readLastOrderId()
  const productsDocuments = await readProductDbByIds(pIds)

  const quantitiesMap: Record<number, number> = {}
  pIds.forEach((id) => {
    if (quantitiesMap[id]) {
      quantitiesMap[id]++
    } else {
      quantitiesMap[id] = 1
    }
  })

  const products = await Promise.all(
    productsDocuments.map(
      async (p): Promise<OrderDbInput['products'][number]> => {
        const quantity =
          quantitiesMap[p.id] > p.stock ? p.stock : quantitiesMap[p.id]

        await reduceStock(p, quantity)

        return {
          product: p,
          quantity,
        }
      },
    ),
  )

  const price = products.reduce((a, b) => a + b.product.price * b.quantity, 0)

  return await createOrder({
    id,
    products,
    price,
  })
}

export async function readOrders() {
  return await ordersModel.find().populate('products.product').exec()
}
