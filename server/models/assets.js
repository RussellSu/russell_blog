var mongoose = require("mongoose")
var Schema = mongoose.Schema

// var optionsSchema = new Schema({
//   key: String,
//   type: String
// }, {
//   _id: false
// })

var assetSchema = new Schema({
  name: String,
  filePath: String,
  fileType: String,
  // options: optionsSchema,
  type: { type: Number, default: 0 },
  created: { type: Date, default: Date.now }
}, {
  collection: "assets"
})

module.exports = mongoose.model("assetModel", assetSchema)
