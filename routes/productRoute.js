const express = require('express')
const {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
} = require('../controllers/productController')
const { pharmacyAuthentication, userAuthentication } = require('../middlewares/authentication')

const router = express.Router()

router.get('/', userAuthentication, getProducts)
// router.get('/one', pharmacyAuthentication, getProductByName)
router.post('/', userAuthentication, addProduct)
router.put('/:id', pharmacyAuthentication, updateProduct)
router.delete('/:id', userAuthentication, deleteProduct)

module.exports = router
