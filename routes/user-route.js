const express = require('express')
const router = express.Router()
const {verifyUserToken} = require('../middlewares/jwt')
const Controller = require('../controllers/user-controller')

module.exports = router