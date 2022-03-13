const homeRoute = require('./homeRoute.js')

const route = app => {
    app.get('/', homeRoute)
}

module.exports = route