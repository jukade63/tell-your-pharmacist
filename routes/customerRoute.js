const express = require('express')
const {
  createHealthInfo,
  getHealthInfo,
  updateHealthInfo,
  addAddress,
  updateAddress,
  deleteAddress,
  getMe,
} = require('../controllers/customerController')
const {
  customerAuthentication,
  pharmacyAuthentication,
} = require('../middlewares/authentication')

const router = express.Router()

router.get('/me', customerAuthentication, getMe)
router.post('/healthInfo', customerAuthentication, createHealthInfo)
router.put('/healthInfo/:id', customerAuthentication, updateHealthInfo)
router.get('/healthInfo/:customerId', pharmacyAuthentication, getHealthInfo)
router.post('/address', customerAuthentication, addAddress)
router.put('/address/:id', customerAuthentication, updateAddress)
router.delete('/address/:id', customerAuthentication, deleteAddress)

module.exports = router
