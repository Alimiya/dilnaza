const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require("dotenv").config({path: ".env"})

const app = express()

app.set('view engine', 'ejs')
app.use(express.static(__dirname + "/public"))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

const admin = require('./routes/admin-route')
const auth = require('./routes/auth-route')
const product = require('./routes/product-route')
const user = require('./routes/user-route')

app.use('/admin', admin)
app.use('/auth', auth)
app.use('/product', product)
app.use('/user', user)

const {DB} = require('./db')

DB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`)
        })
    })
    .catch(err => {
        console.error('Failed to connect to database:', err.message)
    })

module.exports = app