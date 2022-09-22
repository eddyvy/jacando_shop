import { fruitsModel } from './db'
import { Fruit } from './types'

export async function createFruit(fruit: Fruit) {
  const createdFruit = new fruitsModel(fruit)
  await createdFruit.save()
}

export async function readFruits(offset: number, limit: number) {
  return await fruitsModel.find().limit(limit).skip(offset).exec()
}
