import { fruitsModel } from './db'
import { Fruit } from './types'

export async function createFruit(fruit: Fruit) {
  const createdFruit = new fruitsModel(fruit)
  await createdFruit.save()
}
