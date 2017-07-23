var express = require('express')
var app = express()
console.log(123)
var config = require('./config')

require('./databaseConnect')(config)
// require('./routes')(app, config)

var server = app.listen(config.port, () => {
    var host = server.address().address;
    var port = server.address().port;
    console.log("【node server】 listening at http://%s:%s", host, port);
})

var User = require('./models/users.js');
var now = new Date();
User.create({ fullname: "123", created: now, updated: now },(err){
    if (err){
        console.log(err);
    }
    console.log("create success!");
})

