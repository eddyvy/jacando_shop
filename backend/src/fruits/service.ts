import { productsModel } from '../product'
import { Fruit } from './types'

export async function createFruit(fruit: Fruit) {
  const createdFruit = new productsModel(fruit)
  await createdFruit.save()
}

export async function readFruits(offset: number, limit: number) {
  return await productsModel
    .find()
    .where({ category: 'fruit' })
    .limit(limit)
    .skip(offset)
    .exec()
}
