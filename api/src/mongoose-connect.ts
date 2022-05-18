import mongoose from 'mongoose'

const uri = process.env.MONGO_HOST ?? ''
const options = {
  dbName: process.env.MONGO_DB,
  user: process.env.MONGO_USER,
  pass: process.env.MONGO_PASS,
}

export default mongoose.connect(uri, options)
