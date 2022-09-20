import { testEnv } from './mocks'
import { logger } from '../src/logger'
import { start } from '../src/server'

jest.mock('../src/server')
jest.mock('../src/logger', () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}))

describe('Server start', () => {
  testEnv()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Should start the server correctly', async () => {
    ;(start as unknown as jest.Mock).mockResolvedValue('Correct test')
    await import('../src/index')

    expect(start).toHaveBeenCalledTimes(1)
    expect(logger.info).toHaveBeenCalledTimes(1)
    expect(logger.info).toHaveBeenCalledWith('Correct test')
  })
})
