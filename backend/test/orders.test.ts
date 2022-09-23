import { buildTestServer, mockedDb } from './mocks'
import { basketsFixtures, orderFixtures } from '../src/order'

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

  test('Should create a new order correctly', async () => {
    const testId = orderFixtures.length
    const testBasket = basketsFixtures[1]
    const testOrder = orderFixtures[1]
    const testProducts = testOrder.products.map((p) => ({
      ...p.product,
      stock: 20,
      description: 'testing',
    }))

    mockedDb.mockedSort.mockReturnValue({ id: testId })
    mockedDb.mockedWhere.mockReturnValue(testProducts)
    mockedDb.mockedSave.mockReturnValue(testOrder)

    const testServer = buildTestServer()
    const query = `
    mutation Mutation($products: [Int]!) {
      addOrder(products: $products) {
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
    const variables = { products: testBasket }

    const res = await testServer.executeOperation({ query, variables })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({ addOrder: testOrder })
    expect(mockedDb.mockFindOne).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedSort).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedSort).toHaveBeenCalledWith({ id: -1 })
    expect(mockedDb.mockedFind).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedWhere).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedWhere).toHaveBeenCalledWith({
      id: { $in: testBasket },
    })
    expect(mockedDb.mockFindOneAndUpdate).toHaveBeenCalledTimes(5)
    expect(mockedDb.mockedModelConstructor).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedModelConstructor).toHaveBeenCalledWith({
      id: 6,
      price: 26.59,
      products: [
        {
          product: {
            category: 'vegetable',
            id: 2,
            image: 'spinach.png',
            name: 'spinach',
            price: 1.75,
            stock: 20,
            description: 'testing',
          },
          quantity: 1,
        },
        {
          product: {
            category: 'vegetable',
            id: 11,
            image: 'onion.png',
            name: 'onion',
            price: 0.99,
            stock: 20,
            description: 'testing',
          },
          quantity: 2,
        },
        {
          product: {
            category: 'fruit',
            id: 21,
            image: 'raspberries.png',
            name: 'raspberry',
            price: 1.86,
            stock: 20,
            description: 'testing',
          },
          quantity: 1,
        },
        {
          product: {
            category: 'fruit',
            id: 22,
            image: 'papaya.png',
            name: 'papaya',
            price: 7.25,
            stock: 20,
            description: 'testing',
          },
          quantity: 1,
        },
        {
          product: {
            category: 'cheese',
            id: 30,
            image: 'parmesan.png',
            name: 'parmesan',
            price: 13.75,
            stock: 20,
            description: 'testing',
          },
          quantity: 1,
        },
      ],
    })
    expect(mockedDb.mockedSave).toHaveBeenCalledTimes(1)
  })

  test('Should create a new order with quantity equal to stock if that quantity exceeds the stock', async () => {
    const testId = orderFixtures.length
    const testBasket = [
      ...basketsFixtures[1],
      ...Array(200).fill(basketsFixtures[1][0]),
    ]
    const testOrder = orderFixtures[1]
    const testProducts = testOrder.products.map((p) => ({
      ...p.product,
      stock: 20,
      description: 'testing',
    }))

    mockedDb.mockedSort.mockReturnValue({ id: testId })
    mockedDb.mockedWhere.mockReturnValue(testProducts)
    mockedDb.mockedSave.mockReturnValue(testOrder)

    const testServer = buildTestServer()
    const query = `
    mutation Mutation($products: [Int]!) {
      addOrder(products: $products) {
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
    const variables = { products: testBasket }

    const res = await testServer.executeOperation({ query, variables })
    expect(res.errors).toBeUndefined()
    expect(res.data).toEqual({ addOrder: testOrder })
    expect(mockedDb.mockFindOne).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedSort).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedSort).toHaveBeenCalledWith({ id: -1 })
    expect(mockedDb.mockedFind).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedWhere).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedWhere).toHaveBeenCalledWith({
      id: { $in: testBasket },
    })
    expect(mockedDb.mockFindOneAndUpdate).toHaveBeenCalledTimes(5)
    expect(mockedDb.mockedModelConstructor).toHaveBeenCalledTimes(1)
    expect(mockedDb.mockedModelConstructor).toHaveBeenCalledWith({
      id: 6,
      price: 44.41,
      products: [
        {
          product: {
            category: 'vegetable',
            id: 2,
            image: 'spinach.png',
            name: 'spinach',
            price: 1.75,
            stock: 20,
            description: 'testing',
          },
          quantity: 1,
        },
        {
          product: {
            category: 'vegetable',
            id: 11,
            image: 'onion.png',
            name: 'onion',
            price: 0.99,
            stock: 20,
            description: 'testing',
          },
          quantity: 20,
        },
        {
          product: {
            category: 'fruit',
            id: 21,
            image: 'raspberries.png',
            name: 'raspberry',
            price: 1.86,
            stock: 20,
            description: 'testing',
          },
          quantity: 1,
        },
        {
          product: {
            category: 'fruit',
            id: 22,
            image: 'papaya.png',
            name: 'papaya',
            price: 7.25,
            stock: 20,
            description: 'testing',
          },
          quantity: 1,
        },
        {
          product: {
            category: 'cheese',
            id: 30,
            image: 'parmesan.png',
            name: 'parmesan',
            price: 13.75,
            stock: 20,
            description: 'testing',
          },
          quantity: 1,
        },
      ],
    })
    expect(mockedDb.mockedSave).toHaveBeenCalledTimes(1)
  })
})
