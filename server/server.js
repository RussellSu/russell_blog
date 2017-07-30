var express = require('express')
let app = express()
const config = require('./config')

require('./databaseConnect')(config)
// require('./routes')(app, config)

var server = app.listen(config.port, () => {
    let host = server.address().address;
    let port = server.address().port;
    console.log("【node server】 listening at http://%s:%s", host, port);
})

require('./routes')(app, config)

// const User = require('./models/users.js');
// const now = new Date();
// User.create({ fullname: "123", created: now, updated: now }, (err) => {
//     if (err) {
//         console.log(err);
//     }
//     console.log("create success!");
// })

