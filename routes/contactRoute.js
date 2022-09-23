const express = require('express')
const {
  getCustomerContacts,
  getPharmacyContacts,
  addContact,
  getContacts,
} = require('../controllers/contactController')
const {
  pharmacyAuthentication,
  customerAuthentication,
  userAuthentication,
} = require('../middlewares/authentication')
const router = express.Router()

router.get('/', userAuthentication, getContacts)
router.get('/pharmacy', userAuthentication, getCustomerContacts)
router.get('/customer', userAuthentication, getPharmacyContacts)
router.post('/:pharmacyId', customerAuthentication, addContact)

module.exports = router
