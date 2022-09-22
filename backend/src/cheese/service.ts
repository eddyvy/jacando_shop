import { cheesesModel } from './db'
import { Cheese } from './types'

export async function createCheese(cheese: Cheese) {
  const createdCheese = new cheesesModel(cheese)
  await createdCheese.save()
}

export async function readCheeses(offset: number, limit: number) {
  return await cheesesModel.find().limit(limit).skip(offset).exec()
}
