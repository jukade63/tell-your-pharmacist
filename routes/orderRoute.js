const express = require('express')
const {
  createOrder,
  deliveringOrder,
  cancelOrder,
  completedOrder,
  paidOrder,
  getOrder,
} = require('../controllers/orderController')
const {
  pharmacyAuthentication,
  customerAuthentication,
} = require('../middlewares/authentication')
const router = express.Router()

router.post('/', pharmacyAuthentication, createOrder)
router.get('/:pharmacyId', customerAuthentication, getOrder)
router.patch('/paid/:orderId', customerAuthentication, paidOrder)
router.patch('/deliver/:orderId', customerAuthentication, deliveringOrder)
router.patch('/cancel/:orderId', customerAuthentication, cancelOrder)
router.patch('/completed/:orderId', customerAuthentication, completedOrder)

module.exports = router
