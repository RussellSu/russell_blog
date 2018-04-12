const mongoose = require('mongoose')

module.exports = (config) => {
  mongoose.connect(`mongodb://russell:123456@${config.dev.host}/${config.dev.dbname}`, { useMongoClient: true }, err => {
    if (err) {
      return console.error('■mongo connect error■', err)
    }
    console.log('■mongodb connect success !')
  })
  mongoose.Promise = global.Promise
}
