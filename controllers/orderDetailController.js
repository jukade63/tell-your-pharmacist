const { OrderDetail, Product, Order, sequelize } = require("../models");
const createError = require("../utils/createError");

exports.getOrderDetail = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const orderDetail = await OrderDetail.findAll({
      where: { orderId },
      include: [{ model: Product }],
    });
    if (!orderDetail) {
      createError("order datail not found", 400);
    }
    res.status(200).json({ orderDetail });
  } catch (error) {
    next(error);
  }
};

exports.changeAmount = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { id, amount } = req.body;
    const orderDetail = await OrderDetail.findOne({ where: { id, orderId } });
    if (!orderDetail) {
      createError("order detail not found", 400);
    }

    orderDetail.amount = amount;
    orderDetail.save();
    res.status(200).json({ message: `${orderDetail} updated successfully` });
  } catch (error) {
    next(error);
  }
};

exports.deleteOrderDetail = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { id } = req.body;
    const orderDetail = await OrderDetail.findOne({ where: { id, orderId } });
    if (!orderDetail) {
      createError("order detail not found", 400);
    }

    orderDetail.destroy();
    res.status(204).json();
    res.status(200).json({ message: `${orderDetail} deleted successfully` });
  } catch (error) {
    next(error);
  }
};
