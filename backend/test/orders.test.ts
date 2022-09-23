import { buildTestServer, mockedDb } from './mocks'
import { orderFixtures } from '../src/order'

describe('Orders', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should return all orders', async () => {
    mockedDb.mockedExec.mockReturnValue(orderFixtures)

    const testServer = buildTestServer()
    const query = `
    query Query {
      orders {
        id
        products {
          product {
            id
            category
            name
            price
            image
          }
          quantity
        }
        price
      }
    }`

    const res = await testServer.executeOperation({ query })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({
      orders: orderFixtures,
    })
    expect(mockedDb.mockedFind).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedPopulate).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedPopulate).toHaveBeenCalledWith('products.product')
    expect(mockedDb.mockedExec).toHaveBeenCalledTimes(1)
  })

  test('Should return all orders with the correct params', async () => {
    mockedDb.mockedExec.mockReturnValue(orderFixtures)

    const testServer = buildTestServer()
    const query = `
    query Query {
      orders {
        id
        products {
          product {
            name
            price
          }
        }
      }
    }`

    const res = await testServer.executeOperation({ query })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({
      orders: orderFixtures.map((or) => ({
        id: or.id,
        products: or.products.map(({ product }) => ({
          product: { name: product.name, price: product.price },
        })),
      })),
    })
    expect(mockedDb.mockedFind).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedPopulate).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedPopulate).toHaveBeenCalledWith('products.product')
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
          product {
            id
            category
            name
            price
            image
          }
          quantity
        }
        price
      }
    }`

    const res = await testServer.executeOperation({ query })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({ orders: [] })
    expect(mockedDb.mockedFind).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedPopulate).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedPopulate).toHaveBeenCalledWith('products.product')
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
          product {
            id
            category
            name
            price
            image
          }
          quantity
        }
        price
      }
    }`

    const res = await testServer.executeOperation({ query })
    expect(res.errors).toBeDefined()
    expect(res.errors[0].message).toBe('Test Error')
    expect(res.data).toEqual({ orders: null })
    expect(mockedDb.mockedFind).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedPopulate).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedPopulate).toHaveBeenCalledWith('products.product')
    expect(mockedDb.mockedExec).toHaveBeenCalledTimes(1)
  })
})
