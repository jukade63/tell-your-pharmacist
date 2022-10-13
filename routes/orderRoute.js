const express = require('express')
const {
  createOrder,
  deliveringOrder,
  cancelOrder,
  completedOrder,
  paidOrder,
  getOrdersFromCustomer,
  getOrdersFromPharmacy,
  getOrderById,
  getOrders,
} = require('../controllers/orderController')
const {
  pharmacyAuthentication,
  customerAuthentication,
  userAuthentication,
} = require('../middlewares/authentication')
const router = express.Router()

router.post('/', pharmacyAuthentication, createOrder)
router.get('/', userAuthentication, getOrders)
router.get('/:id', userAuthentication, getOrderById)
// router.get('/pharmacy', pharmacyAuthentication, getOrdersFromPharmacy)
router.patch('/paid/:id', customerAuthentication, paidOrder)
router.patch('/deliver/:id', customerAuthentication, deliveringOrder)
router.patch('/cancel/:id', customerAuthentication, cancelOrder)
router.patch('/completed/:id', customerAuthentication, completedOrder)

module.exports = router
