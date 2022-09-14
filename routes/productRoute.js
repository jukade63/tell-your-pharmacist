const express = require('express')
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController')
const { pharmacyAuthentication } = require('../middlewares/authentication')

const router = express.Router()

router.get('/', pharmacyAuthentication, getProducts)
router.post('/', pharmacyAuthentication, addProduct)
router.put('/:id', pharmacyAuthentication, updateProduct)
router.delete('/:id', pharmacyAuthentication, deleteProduct)

module.exports = router
