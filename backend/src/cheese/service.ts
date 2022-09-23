import { productsModel } from '../product'
import { Cheese } from './types'

export async function createCheese(cheese: Cheese) {
  const createdCheese = new productsModel(cheese)
  await createdCheese.save()
}

export async function readCheeses(offset: number, limit: number) {
  return await productsModel
    .find()
    .where({ category: 'cheese' })
    .limit(limit)
    .skip(offset)
    .exec()
}
