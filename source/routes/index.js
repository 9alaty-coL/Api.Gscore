const homeRoute = require('./homeRoute.js')

const route = app => {
    app.use('/', homeRoute)
}

module.exports = route