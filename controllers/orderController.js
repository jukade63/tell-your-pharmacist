const { Order, OrderDetail } = require('../models')
const createError = require('../utils/createError')

exports.getOrder = async (req, res, next) => {
  try {
    const { pharmacyId } = req.params
    const customerId = req.user.id
    const order = await Order.findOne({
      where: { pharmacyId, customerId },
      include: [{ model: OrderDetail }],
    })
    if (!order) {
      createError('order is not found', 400)
    }
    res.status(200).json({ order })
  } catch (error) {
    next(error)
  }
}

exports.createOrder = async (req, res, next) => {
  try {
    const { customerId } = req.body
    const { id } = req.user
    const order = await Order.create({
      status: 'PENDING',
      pharmacyId: id,
      customerId,
    })
    if (!order) {
      createError('failed to create order', 400)
    }

    res.status(201).json({ order })
  } catch (error) {
    next(error)
  }
}

exports.cancelOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params
    const order = Order.findOne({
      where: { orderId, status: 'PENDING' },
    })
    if (!order) {
      createError('order not found', 400)
    }

    order.status = 'CANCELLED'
    await order.save()
    res.json({ message: 'order has been cancelled' })
  } catch (error) {
    next(error)
  }
}

exports.paidOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params
    const order = Order.findOne({
      where: { orderId, status: 'PENDING' },
    })
    if (!order) {
      createError('order not found', 400)
    }

    order.status = 'PAID'
    await order.save()
    res.json({ message: 'order has been paid' })
  } catch (error) {
    next(error)
  }
}

exports.deliveringOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params
    const order = Order.findOne({
      where: { orderId, status: 'PAID' },
    })
    if (!order) {
      createError('order not found', 400)
    }

    order.status = 'DELIVERING'
    await order.save()
    res.json({ message: 'order is on delivery' })
  } catch (error) {
    next(error)
  }
}

exports.completedOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params
    const order = Order.findOne({
      where: { orderId, status: 'DELIVERING' },
    })
    if (!order) {
      createError('order not found', 400)
    }

    order.status = 'COMPLETED'
    await order.save()
    res.json({ message: 'order is completed' })
  } catch (error) {
    next(error)
  }
}
