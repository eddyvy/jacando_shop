import { vegetableFixtures } from '../src/vegetable'
import { buildTestServer } from './mocks/server'

describe('Vegetables', () => {
  test('Should return the first 5 vegetables', async () => {
    const testServer = buildTestServer()
    const query = `
    query VegetablesQuery($offset: Int!, $limit: Int!) {
      vegetables(offset: $offset, limit: $limit) {
        id
        category
        name
        price
        description
        stock
        image
        isLocal
      }
    }`
    const variables = { offset: 0, limit: 5 }

    const res = await testServer.executeOperation({ query, variables })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({
      vegetables: vegetableFixtures.slice(0, 5),
    })
  })
})
