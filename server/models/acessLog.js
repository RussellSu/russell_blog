var mongoose = require('mongoose')
var Schema = mongoose.Schema

var accessLogSchema  = new Schema({
    fullname: { type: String, default: '', index: true},
    created: { type: Date, default: Date.now, index: true},
})

accessLogSchema.pre('save', next => {
    var _this = this
    next()
})

module.exports = mongoose.model('accessLogModel', userSchema)
