import { Request, Response } from 'express'
import { productsModel } from '../product'
import { cheeseFixtures, createCheese } from '../cheese'
import { createFruit, fruitFixtures } from '../fruits'
import { createVegetable, vegetableFixtures } from '../vegetable'

export async function fixturesController(_: Request, res: Response) {
  await productsModel.deleteMany()

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
