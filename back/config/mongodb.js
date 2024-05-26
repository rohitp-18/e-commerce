const mongoose = require('mongoose')

const mongoUrl = process.env.MONGO_URL

const mongodb = async () => {
  await mongoose.connect(mongoUrl)
}
module.exports = mongodb