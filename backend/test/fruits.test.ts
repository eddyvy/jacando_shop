import { buildTestServer, mockedDb } from './mocks'
import { fruitFixtures } from '../src/fruits'

describe('Fruits', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return the first 5 fruits', async () => {
    mockedDb.mockedExec.mockReturnValue(fruitFixtures.slice(0, 5))
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
    expect(res.data).toEqual({ fruits: fruitFixtures.slice(0, 5) })
    expect(mockedDb.mockedFind).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedLimit).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedLimit).toHaveBeenCalledWith(5)
    expect(mockedDb.mockedSkip).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedSkip).toHaveBeenCalledWith(0)
    expect(mockedDb.mockedExec).toHaveBeenCalledTimes(1)
  })

  test('Should return the first 5 fruits with the correct params', async () => {
    mockedDb.mockedExec.mockReturnValue(fruitFixtures.slice(0, 5))

    const testServer = buildTestServer()
    const query = `
    query FruitsQuery($offset: Int!, $limit: Int!) {
      fruits(offset: $offset, limit: $limit) {
        name
        image
      }
    }`
    const variables = { offset: 0, limit: 5 }

    const res = await testServer.executeOperation({ query, variables })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({
      fruits: fruitFixtures.slice(0, 5).map(({ name, image }) => ({
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
    const variables = { offset: 100000, limit: 2000 }

    const res = await testServer.executeOperation({ query, variables })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({ fruits: [] })
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
    const variables = { offset: 5, limit: 5 }

    const res = await testServer.executeOperation({ query, variables })
    expect(res.errors).toBeDefined()
    expect(res.errors[0].message).toBe('Test Error')
    expect(res.data).toEqual({ fruits: null })
    expect(mockedDb.mockedFind).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedLimit).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedLimit).toHaveBeenCalledWith(5)
    expect(mockedDb.mockedSkip).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedSkip).toHaveBeenCalledWith(5)
    expect(mockedDb.mockedExec).toHaveBeenCalledTimes(1)
  })
})
