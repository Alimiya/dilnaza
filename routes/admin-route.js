const express = require('express')
const router = express.Router()
const {verifyAdminToken} = require('../middlewares/jwt')
const Controller = require('../controllers/admin-controller')

module.exports = router