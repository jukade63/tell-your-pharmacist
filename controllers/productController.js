const { Product } = require('../models')
const createError = require('../utils/createError')

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: { pharmacyId: req.user.id },
    })

    res.status(200).json({ products })
  } catch (error) {
    next(error)
  }
}
exports.getProductByName = async (req,res,next)=>{
  const {name} = req.body
  try {
    const product = Product.findOne({where: {name}})
    if(!product){
      createError('Product not found', 400)
    }
    res.status(200).json({product})
  } catch (error) {
    next(error)
  }
}

exports.addProduct = async (req, res, next) => {
  try {
    const { name, quantity, price } = req.body
    if (name === '') {
      createError('name is required', 400)
    }
    if (quantity === '') {
      createError('quantity is required', 400)
    }
    if (name === '') {
      createError('price is required', 400)
    }
    const product = await Product.create({
      name,
      quantity,
      price,
      pharmacyId: req.user.id,
    })

    res.status(201).json({ product })
  } catch (error) {
    next(error)
  }
}

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const { quantity, price } = req.body
    const product = await Product.findOne({
      where: { id, pharmacyId: req.user.id },
    })

    if (product === '') {
      createError('product was not found', 400)
    }
    product.quantity = quantity
    product.price = price

    await product.save()
    res.status(200).json({ product })
  } catch (error) {
    next(error)
  }
}

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params
    const product = await Product.findOne({
      where: { id, pharmacyId: req.user.id },
    })
    if (product === '') {
      createError('product not found', 400)
    }

    await product.destroy()
    res.status(204).json({message: 'product deleted'})
  } catch (error) {
    next(error)
  }
}
