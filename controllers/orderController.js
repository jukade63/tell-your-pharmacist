const { Order, OrderDetail, Product, Pharmacy, Customer } = require("../models");
const createError = require("../utils/createError");

exports.getOrdersFromCustomer = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { customerId: req.user.id },
      include: [{model: Pharmacy}],
    });
    if (!orders) {
      createError("order is not found", 400);
    }

    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};

exports.getOrdersFromPharmacy = async (req, res, next) => {
  try {
    const orders = await Order.findOne({
      where: { pharmacyId: req.user.id },
      include: [{model: Customer}],
      
    });
    if (!orders) {
      createError("order is not found", 400);
    }
    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};



exports.createOrder = async (req, res, next) => {
  try {
    const { customerId, orderDetails, deliveryFee } = req.body;
    const { id } = req.user;
    const order = await Order.create({
      status: "PENDING",
      pharmacyId: id,
      customerId,
      deliveryFee
    });

    if (order) {
      let mappedOrderDetails = orderDetails.map((od) => {
        return { ...od, orderId: order.id };
      });
      await OrderDetail.bulkCreate(mappedOrderDetails);
    }

    if (!order) {
      createError("failed to create order", 400);
    }

    res.status(201).json({ order });
  } catch (error) {
    next(error);
  }
};

exports.cancelOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = Order.findOne({
      where: { orderId, status: "PENDING" },
    });
    if (!order) {
      createError("order not found", 400);
    }

    order.status = "CANCELLED";
    await order.save();
    res.json({ message: "order has been cancelled" });
  } catch (error) {
    next(error);
  }
};

exports.paidOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = Order.findOne({
      where: { orderId, status: "PENDING" },
    });
    if (!order) {
      createError("order not found", 400);
    }

    order.status = "PAID";
    await order.save();
    res.json({ message: "order has been paid" });
  } catch (error) {
    next(error);
  }
};

exports.deliveringOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = Order.findOne({
      where: { orderId, status: "PAID" },
    });
    if (!order) {
      createError("order not found", 400);
    }

    order.status = "DELIVERING";
    await order.save();
    res.json({ message: "order is on delivery" });
  } catch (error) {
    next(error);
  }
};

exports.completedOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = Order.findOne({
      where: { orderId, status: "DELIVERING" },
    });
    if (!order) {
      createError("order not found", 400);
    }

    order.status = "COMPLETED";
    await order.save();
    res.json({ message: "order is completed" });
  } catch (error) {
    next(error);
  }
};
