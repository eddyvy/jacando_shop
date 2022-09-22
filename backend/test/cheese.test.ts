import { cheeseFixtures } from '../src/cheese'
import { buildTestServer } from './mocks/server'

describe('Cheeses', () => {
  test('Should return the first 5 cheeses', async () => {
    const testServer = buildTestServer()
    const query = `
    query CheesesQuery($offset: Int!, $limit: Int!) {
      cheeses(offset: $offset, limit: $limit) {
        id
        category
        name
        price
        description
        stock
        image
        smellLevel
      }
    }`
    const variables = { offset: 0, limit: 5 }

    const res = await testServer.executeOperation({ query, variables })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({
      cheeses: cheeseFixtures.slice(0, 5),
    })
  })
})
