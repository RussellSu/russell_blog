const mongoose = require('mongoose')

module.exports = (config) => {
  mongoose.connect(`mongodb://${config.dev.host}/${config.dev.dbname}`, { useMongoClient: true }, err => {
    if (err) {
      console.error('mongo connect error:', err)
    }
    // console.log('mongodb connected !')
  })
}
