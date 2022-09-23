import { productsModel } from '../product'
import { Vegetable } from './types'

export async function createVegetable(vegetable: Vegetable) {
  const createdVeg = new productsModel(vegetable)
  await createdVeg.save()
}

export async function readVegetables(offset: number, limit: number) {
  return await productsModel
    .find()
    .where({ category: 'vegetable' })
    .limit(limit)
    .skip(offset)
    .exec()
}
