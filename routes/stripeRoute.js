const express = require('express')
const { stripeCharge } = require('../controllers/stripeController')
const router = express.Router()

router.post('/', stripeCharge)

module.exports = router