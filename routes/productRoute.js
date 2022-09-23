const express = require('express')
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
} = require('../controllers/productController')
const { pharmacyAuthentication } = require('../middlewares/authentication')

const router = express.Router()

router.get('/', pharmacyAuthentication, getProducts)
// router.get('/one', pharmacyAuthentication, getProductByName)
// router.post('/', pharmacyAuthentication, addProduct)
router.put('/:id', pharmacyAuthentication, updateProduct)
router.delete('/:id', pharmacyAuthentication, deleteProduct)

module.exports = router
