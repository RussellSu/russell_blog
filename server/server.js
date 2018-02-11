var express = require('express')
let app = express()
const apiRouter = express.Router()
const config = require('./config')
const passport = require('passport')

require('./databaseConnect')(config)
require('./setup')(app, passport, config)
require('./routes.js')(express, app, config, apiRouter)

var server = app.listen(config.port, () => {
  let host = server.address().address
  let port = server.address().port
  console.log('【node server】 listening at http://%s:%s', host, port)
})

// const User = require('./models/users.js');
// const now = new Date();
// User.create({ fullname: "123", created: now, updated: now }, (err) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log("create success!");
// })

