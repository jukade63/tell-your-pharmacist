const express = require('express')
const {
  addOrderDetail,
  changeAmount,
  deleteOrderDetail,
  getOrderDetail,
} = require('../controllers/orderDetailController')
const { pharmacyAuthentication } = require('../middlewares/authentication')

const router = express.Router()

// router.post('/', pharmacyAuthentication, addOrderDetail)
router.get('/:orderId', getOrderDetail)
router.patch('/:orderId', pharmacyAuthentication, changeAmount)
router.delete('/:orderId', pharmacyAuthentication, deleteOrderDetail)

module.exports = router
