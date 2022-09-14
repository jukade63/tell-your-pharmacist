const express = require('express')
const {
  getCustomerContacts,
  getPharmacyContacts,
  addContact,
} = require('../controllers/contactController')
const {
  pharmacyAuthentication,
  customerAuthentication,
} = require('../middlewares/authentication')
const router = express.Router()

router.get('/pharmacy', pharmacyAuthentication, getCustomerContacts)
router.get('/customer', customerAuthentication, getPharmacyContacts)
router.post('/:pharmacyId', customerAuthentication, addContact)

module.exports = router
