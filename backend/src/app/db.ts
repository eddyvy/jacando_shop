import { connect } from 'mongoose'

export const connectDb = async () =>
  connect(process.env.MONGO_HOST, {
    dbName: process.env.MONGO_INITDB_DATABASE,
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
  })
