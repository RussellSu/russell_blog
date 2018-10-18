var mongoose = require("mongoose")
var Schema = mongoose.Schema

// var optionsSchema = new Schema({
//   key: String,
//   type: String
// }, {
//   _id: false
// })

var assetSchema = new Schema({
  name: { type: String, required: true },
  filePath: { type: String, default: '' },
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'userModel' },
  identifier: { type: String },
  // options: optionsSchema,
  type: { type: String, default: 'other', enum: ['avatar', 'movie', 'music', 'image', 'other'] },
  created: { type: Date, default: Date.now }
}, {
  collection: "assets"
})

module.exports = mongoose.model("assetModel", assetSchema)
