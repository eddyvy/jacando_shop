import { buildTestServer, mockedDb } from './mocks'
import { vegetableFixtures } from '../src/vegetable'
import { fruitFixtures } from '../src/fruits'
import { cheeseFixtures } from '../src/cheese'

describe('Orders', () => {
  const ordersTestData = [
    {
      id: 1,
      products: [
        ...vegetableFixtures.slice(12, 20),
        ...fruitFixtures.slice(6, 12),
        ...cheeseFixtures.slice(0, 2),
      ],
      price: 100,
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return all orders', async () => {
    mockedDb.mockedExec.mockReturnValue(ordersTestData)

    const testServer = buildTestServer()
    const query = `
    query Query {
      orders {
        id
        products {
          id
          category
          name
          price
          image
        }
        price
      }
    }`

    const res = await testServer.executeOperation({ query })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({
      orders: ordersTestData.map((or) => ({
        ...or,
        products: or.products.map((p) => ({
          id: p.id,
          category: p.category,
          name: p.name,
          price: p.price,
          image: p.image,
        })),
      })),
    })
    expect(mockedDb.mockedFind).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedPopulate).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedPopulate).toHaveBeenCalledWith('products')
    expect(mockedDb.mockedExec).toHaveBeenCalledTimes(1)
  })

  test('Should return all orders with the correct params', async () => {
    mockedDb.mockedExec.mockReturnValue(ordersTestData)

    const testServer = buildTestServer()
    const query = `
    query Query {
      orders {
        id
        products {
          name
          price
        }
      }
    }`

    const res = await testServer.executeOperation({ query })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({
      orders: ordersTestData.map((or) => ({
        id: or.id,
        products: or.products.map((p) => ({
          name: p.name,
          price: p.price,
        })),
      })),
    })
    expect(mockedDb.mockedFind).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedPopulate).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedPopulate).toHaveBeenCalledWith('products')
    expect(mockedDb.mockedExec).toHaveBeenCalledTimes(1)
  })

  test('Should return an empty array if the database returns it', async () => {
    mockedDb.mockedExec.mockReturnValue([])

    const testServer = buildTestServer()
    const query = `
    query Query {
      orders {
        id
        products {
          id
          category
          name
          price
          image
        }
        price
      }
    }`

    const res = await testServer.executeOperation({ query })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({ orders: [] })
    expect(mockedDb.mockedFind).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedPopulate).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedPopulate).toHaveBeenCalledWith('products')
    expect(mockedDb.mockedExec).toHaveBeenCalledTimes(1)
  })

  test('Should return a null value if there exists an error', async () => {
    mockedDb.mockedExec.mockImplementation(() => {
      throw new Error('Test Error')
    })

    const testServer = buildTestServer()
    const query = `
    query Query {
      orders {
        id
        products {
          id
          category
          name
          price
          image
        }
        price
      }
    }`
    const variables = { offset: 5, limit: 5 }

    const res = await testServer.executeOperation({ query, variables })
    expect(res.errors).toBeDefined()
    expect(res.errors[0].message).toBe('Test Error')
    expect(res.data).toEqual({ orders: null })
    expect(mockedDb.mockedFind).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedPopulate).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedPopulate).toHaveBeenCalledWith('products')
    expect(mockedDb.mockedExec).toHaveBeenCalledTimes(1)
  })
})
