const express = require('express')
const authPharmacyController = require('../controllers/authPharmacyController')

const router = express.Router()

router.post('/login', authPharmacyController.login)
router.post('/signup', authPharmacyController.signup)

module.exports = router
