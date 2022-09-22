import { vegetablesModel } from './db'
import { Vegetable } from './types'

export async function createVegetable(vegetable: Vegetable) {
  const createdVeg = new vegetablesModel(vegetable)
  await createdVeg.save()
}

export async function readVegetables(offset: number, limit: number) {
  return await vegetablesModel.find().limit(limit).skip(offset).exec()
}
