const { OrderDetail, Product, sequelize } = require('../models')
const createError = require('../utils/createError')

exports.addOrderDetail = async (req, res, next) => {
  const t = await sequelize.transaction()
  try {
    const { orderId } = req.params
    const { name } = req.body
    const product = await Product.findOne({ where: { name } })
    if (!product) {
      createError('no product found', 400)
    }
    const orderDetail = await OrderDetail.create(
      { price: product.price, amount: 1, orderId, productId: product.id },
      { transaction: t }
    )

    await t.commit()
    res.status(201).json({ orderDetail })
  } catch (error) {
    await t.rollback()
    next()
  }
}

exports.changeAmount = async (req, res, next) => {
  try {
    const { orderId } = req.params
    const { id, amount } = req.body
    const orderDetail = await OrderDetail.findOne({ where: { id, orderId } })
    if (!orderDetail) {
      createError('order detail not found', 400)
    }

    orderDetail.amount = amount
    orderDetail.save()
    res.status(200).json({ message: `${orderDetail} updated successfully` })
  } catch (error) {
    next(error)
  }
}

exports.deleteOrderDetail = async (req, res, next) => {
  try {
    const { orderId } = req.params
    const { id } = req.body
    const orderDetail = await OrderDetail.findOne({ where: { id, orderId } })
    if (!orderDetail) {
      createError('order detail not found', 400)
    }

    orderDetail.destroy()
    res.status(204).json()
    res.status(200).json({ message: `${orderDetail} updated successfully` })
  } catch (error) {
    next(error)
  }
}
