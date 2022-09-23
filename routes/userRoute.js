const { getMe } = require('../controllers/userController')

const express = require('express')
const { userAuthentication } = require('../middlewares/authentication')

const router = express.Router()

router.get('/me', userAuthentication, getMe)

module.exports =  router

