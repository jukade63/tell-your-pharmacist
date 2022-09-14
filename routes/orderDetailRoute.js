const express = require('express')
const {
  addOrderDetail,
  changeAmount,
  deleteOrderDetail,
} = require('../controllers/orderDetailController')
const { pharmacyAuthentication } = require('../middlewares/authentication')
const router = express.Router()

router.post('/:orderId', pharmacyAuthentication, addOrderDetail)
router.patch('/:orderId', pharmacyAuthentication, changeAmount)
router.delete('/:orderId', pharmacyAuthentication, deleteOrderDetail)

module.exports = router
