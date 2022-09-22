import { vegetablesModel } from './db'
import { Vegetable } from './types'

export async function createVegetable(vegetable: Vegetable) {
  const createdVeg = new vegetablesModel(vegetable)
  await createdVeg.save()
}
