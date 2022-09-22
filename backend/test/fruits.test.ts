import { fruitFixtures } from '../src/fruits'
import { buildTestServer } from './mocks/server'

describe('Fruits', () => {
  test('Should return the first 5 vegetables', async () => {
    const testServer = buildTestServer()
    const query = `
    query FruitsQuery($offset: Int!, $limit: Int!) {
      fruits(offset: $offset, limit: $limit) {
        id
        category
        name
        price
        description
        stock
        image
        waterPct
      }
    }`
    const variables = { offset: 0, limit: 5 }

    const res = await testServer.executeOperation({ query, variables })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({
      fruits: fruitFixtures.slice(0, 5),
    })
  })
})
