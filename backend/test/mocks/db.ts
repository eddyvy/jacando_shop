const mockedLimit = jest.fn()
const mockedSkip = jest.fn()
const mockedExec = jest.fn()
const mockedSave = jest.fn()
const mockedFind = jest.fn()
const mockedModelConstructor = jest.fn()

export const mockedDb = {
  connect: jest.fn(),
  Schema: jest.fn(),
  model: jest.fn().mockReturnValue({
    constructor: mockedModelConstructor,
    save: mockedSave,
    find: mockedFind,
    limit: mockedLimit,
    skip: mockedSkip,
    exec: mockedExec,
  }),

  mockedModelConstructor,
  mockedFind,
  mockedSave,
  mockedLimit,
  mockedSkip,
  mockedExec,
}

mockedSave.mockReturnValue(mockedDb.model())
mockedFind.mockReturnValue(mockedDb.model())
mockedLimit.mockReturnValue(mockedDb.model())
mockedSkip.mockReturnValue(mockedDb.model())

jest.mock('mongoose', () => mockedDb)
