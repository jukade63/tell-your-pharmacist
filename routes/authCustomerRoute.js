const express = require('express')
const authCustomerController = require('../controllers/authCustomerController')

const router = express.Router()

router.post('/login', authCustomerController.login)
router.post('/signup', authCustomerController.signup)

module.exports = router
