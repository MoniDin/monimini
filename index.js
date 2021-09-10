const express = require('express')
const app = express()
const routes = require('./routes/routes.js')
const cookieParser = require('cookie-parser')
const dotenv = require("dotenv").config()
app.use(express.static(__dirname + '/public/'))

app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
 
app.use(routes)

app.listen(process.env.PORTB)
console.log("running on port " + process.env.PORTB)