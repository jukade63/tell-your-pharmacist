const { Order, OrderDetail, Pharmacy, Customer } = require("../models");
const createError = require("../utils/createError");
const sequelize = require("sequelize");
const { Op } = require("sequelize");

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        [Op.or]: [{ pharmacyId: req.user.id }, { customerId: req.user.id }],
      },
      include: [
        {
          model: Pharmacy,
          attributes: ["storeName", "profilePic"],
          
        },
        {
          model: Customer,
            attributes: ["firstName", "lastName", "profilePic"],
        },
      ],
      order: [
        [
          sequelize.fn(
            "field",
            sequelize.col("status"),
            "PENDING",
            "PAID",
            "DELIVERING",
            "CANCELLED",
            "COMPLETED"
          ),
        ],
        ["createdAt", "DESC"],
      ],
    });
    if (!orders) {
      createError("order is not found", 400);
    }

    res.status(200).json({ orders });
  } catch (error) {
    next(error);
  }
};


exports.getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({ where: { id } });
    if (!order) {
      createError("order not found", 400);
    }
    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { customerId, orderDetails, status, deliveryFee } = req.body;
    const { id } = req.user;

    if (!customerId) {
      createError("กรุณาเลือกลูกค้า", 400);
    }
    if (!orderDetails || orderDetails.length === 0) {
      createError("กรุณาเพิ่มรายการยา", 400);
    }
    const order = await Order.create({
      status,
      pharmacyId: id,
      customerId,
      deliveryFee,
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
    const { id } = req.params;
    const order = await Order.update(
      { status: "PAID" },
      {
        where: { id },
      }
    );
    if (!order) {
      createError("order not found", 400);
    }

    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
};

exports.deliveringOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findOne({
      where: { id, status: "PAID" },
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
    const { id } = req.params;
    const order = await Order.findOne({
      where: { id, status: "DELIVERING" },
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
