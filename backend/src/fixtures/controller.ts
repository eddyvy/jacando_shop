import { Request, Response } from 'express'
import { cheeseFixtures, cheesesModel, createCheese } from '../cheese'
import { createFruit, fruitFixtures, fruitsModel } from '../fruits'
import {
  createVegetable,
  vegetableFixtures,
  vegetablesModel,
} from '../vegetable'

export async function fixturesController(_: Request, res: Response) {
  await vegetablesModel.deleteMany()
  await fruitsModel.deleteMany()
  await cheesesModel.deleteMany()

  for (const veg of vegetableFixtures) {
    await createVegetable(veg)
  }
  for (const fru of fruitFixtures) {
    await createFruit(fru)
  }
  for (const che of cheeseFixtures) {
    await createCheese(che)
  }

  res.send({ success: true })
}
