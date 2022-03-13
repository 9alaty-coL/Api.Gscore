const express = require('express')

const app = express();
const port = process.env.PORT || 3000;

const route = require('./routes/index')
route(app)

app.listen(port, ()=>{
    console.log('App listening at port', port)
})