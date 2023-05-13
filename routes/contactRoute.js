const express = require('express')
const {
  getCustomerContacts,
  getPharmacyContacts,
  addContact,
  getContacts,
  getOneContact,
} = require('../controllers/contactController')
const {
  customerAuthentication,
  userAuthentication,
} = require('../middlewares/authentication')
const router = express.Router()

router.get('/', userAuthentication, getContacts)
router.get('/contact/:contactId', userAuthentication, getOneContact)
router.post('/:pharmacyId', customerAuthentication, addContact)

module.exports = router
