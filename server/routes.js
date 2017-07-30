module.exports = (app, config) => {
    console.log('routes.js require success!')
    require('./routes/users')
    console.log(45678)
    app.get('*', (req, res) => { console.log() })
}
