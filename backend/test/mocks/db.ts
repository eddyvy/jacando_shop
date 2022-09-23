const mockedLimit = jest.fn()
const mockedSkip = jest.fn()
const mockedExec = jest.fn()
const mockedSave = jest.fn()
const mockedWhere = jest.fn()
const mockedFind = jest.fn()
const mockedSort = jest.fn()
const mockedPopulate = jest.fn()
const mockFindOne = jest.fn()
const mockFindOneAndUpdate = jest.fn()
const mockedModelConstructor = jest.fn()
class MockedSchema {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  static Types = { ObjectId: 'MockedObjId' }
}

class MockedModel {
  constructor(...args: any[]) {
    mockedModelConstructor(...args)
  }

  save = mockedSave
  static find = mockedFind
  static sort = mockedSort
  static where = mockedWhere
  static limit = mockedLimit
  static skip = mockedSkip
  static populate = mockedPopulate
  static findOne = mockFindOne
  static findOneAndUpdate = mockFindOneAndUpdate
  static exec = mockedExec
}

export const mockedDb = {
  connect: jest.fn(),
  Schema: MockedSchema,
  model: jest.fn().mockReturnValue(MockedModel),

  mockedModelConstructor,
  mockedFind,
  mockedWhere,
  mockedSave,
  mockedLimit,
  mockedSkip,
  mockedSort,
  mockedPopulate,
  mockFindOne,
  mockFindOneAndUpdate,
  mockedExec,
}

mockedSave.mockReturnValue(mockedDb.model())
mockedFind.mockReturnValue(mockedDb.model())
mockedWhere.mockReturnValue(mockedDb.model())
mockedLimit.mockReturnValue(mockedDb.model())
mockedSort.mockReturnValue(mockedDb.model())
mockedPopulate.mockReturnValue(mockedDb.model())
mockFindOne.mockReturnValue(mockedDb.model())
mockFindOneAndUpdate.mockReturnValue(mockedDb.model())
mockedSkip.mockReturnValue(mockedDb.model())

jest.mock('mongoose', () => mockedDb)
