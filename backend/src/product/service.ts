import { productsModel } from './db'
import { ProductDocument } from './types'

export async function readProductDbByIds(
  ids: number[],
): Promise<ProductDocument[]> {
  return productsModel.find().where({ id: { $in: ids } })
}

export async function reduceStock(
  product: ProductDocument,
  quantity: number,
): Promise<void> {
  if (quantity > product.stock)
    throw new Error(`Not enough '${product.name}' in stock!`)

  await productsModel.findOneAndUpdate(
    { _id: product._id },
    { stock: product.stock - quantity },
  )
}
