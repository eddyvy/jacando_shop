import { buildTestServer, mockedDb } from './mocks'
import { cheeseFixtures } from '../src/cheese'

describe('Cheeses', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return the 4 cheese products', async () => {
    mockedDb.mockedExec.mockReturnValue(cheeseFixtures.slice(0, 5))
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
      cheeses: cheeseFixtures,
    })
    expect(mockedDb.mockedFind).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedLimit).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedLimit).toHaveBeenCalledWith(5)
    expect(mockedDb.mockedSkip).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedSkip).toHaveBeenCalledWith(0)
    expect(mockedDb.mockedExec).toHaveBeenCalledTimes(1)
  })

  test('Should return the 4 cheese products with the correct params', async () => {
    mockedDb.mockedExec.mockReturnValue(cheeseFixtures.slice(0, 5))

    const testServer = buildTestServer()
    const query = `
    query CheesesQuery($offset: Int!, $limit: Int!) {
      cheeses(offset: $offset, limit: $limit) {
        name
        image
      }
    }`
    const variables = { offset: 0, limit: 5 }

    const res = await testServer.executeOperation({ query, variables })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({
      cheeses: cheeseFixtures.map(({ name, image }) => ({
        name,
        image,
      })),
    })
    expect(mockedDb.mockedFind).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedLimit).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedLimit).toHaveBeenCalledWith(5)
    expect(mockedDb.mockedSkip).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedSkip).toHaveBeenCalledWith(0)
    expect(mockedDb.mockedExec).toHaveBeenCalledTimes(1)
  })

  test('Should return an empty array if the database returns it', async () => {
    mockedDb.mockedExec.mockReturnValue([])

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
    const variables = { offset: 100000, limit: 2000 }

    const res = await testServer.executeOperation({ query, variables })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({ cheeses: [] })
    expect(mockedDb.mockedFind).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedLimit).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedLimit).toHaveBeenCalledWith(2000)
    expect(mockedDb.mockedSkip).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedSkip).toHaveBeenCalledWith(100000)
    expect(mockedDb.mockedExec).toHaveBeenCalledTimes(1)
  })

  test('Should return a null value if there exists an error', async () => {
    mockedDb.mockedExec.mockImplementation(() => {
      throw new Error('Test Error')
    })

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
    const variables = { offset: 5, limit: 5 }

    const res = await testServer.executeOperation({ query, variables })
    expect(res.errors).toBeDefined()
    expect(res.errors[0].message).toBe('Test Error')
    expect(res.data).toEqual({ cheeses: null })
    expect(mockedDb.mockedFind).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedLimit).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedLimit).toHaveBeenCalledWith(5)
    expect(mockedDb.mockedSkip).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedSkip).toHaveBeenCalledWith(5)
    expect(mockedDb.mockedExec).toHaveBeenCalledTimes(1)
  })
})
