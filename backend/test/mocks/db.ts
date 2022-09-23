const mockedLimit = jest.fn()
const mockedSkip = jest.fn()
const mockedExec = jest.fn()
const mockedSave = jest.fn()
const mockedWhere = jest.fn()
const mockedFind = jest.fn()
const mockedModelConstructor = jest.fn()
class MockedSchema {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  static Types = { ObjectId: 'MockedObjId' }
}

export const mockedDb = {
  connect: jest.fn(),
  Schema: MockedSchema,
  model: jest.fn().mockReturnValue({
    constructor: mockedModelConstructor,
    save: mockedSave,
    find: mockedFind,
    where: mockedWhere,
    limit: mockedLimit,
    skip: mockedSkip,
    exec: mockedExec,
  }),

  mockedModelConstructor,
  mockedFind,
  mockedWhere,
  mockedSave,
  mockedLimit,
  mockedSkip,
  mockedExec,
}

mockedSave.mockReturnValue(mockedDb.model())
mockedFind.mockReturnValue(mockedDb.model())
mockedWhere.mockReturnValue(mockedDb.model())
mockedLimit.mockReturnValue(mockedDb.model())
mockedSkip.mockReturnValue(mockedDb.model())

jest.mock('mongoose', () => mockedDb)
