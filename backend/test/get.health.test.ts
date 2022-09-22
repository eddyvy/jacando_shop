import supertest from 'supertest'
import { buildExpress } from '../src/server'

jest.mock('../src/logger/service.ts', () => ({
  logger: {
    info: jest.fn(),
    warn: jest.fn(),
    error: jest.fn(),
  },
}))

describe('GET /health', () => {
  test('Should return 200 with express server up', async () => {
    const app = buildExpress()

    await supertest(app).get('/health').expect(200)
  })
})
