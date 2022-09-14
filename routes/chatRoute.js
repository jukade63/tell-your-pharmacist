const express = require('express')
const { addMessage, getMessages } = require('../controllers/chatConrtroller')
const {
  pharmacyAuthentication,
  customerAuthentication,
} = require('../middlewares/authentication')
const router = express.Router()

router.post('/', pharmacyAuthentication, customerAuthentication, addMessage)
router.get('/:contactId', getMessages)

module.exports = router
