const { Review, Pharmacy, Customer } = require("../models");
const createError = require("../utils/createError");

exports.addReview = async (req, res, next) => {
  try {
    const { text, star, customerId, pharmacyId } = req.body;
    const review = await Review.create({ text, star, customerId, pharmacyId });
    if (!review) {
      createError("cannot add review", 400);
    }
    res.status(201).json({ review });
  } catch (error) {
    next(error);
  }
};
exports.getReviews = async (req, res, next) => {
  try {
    const { pharmacyId } = req.params;
    const reviews = await Review.findAll({
      where: { pharmacyId },
      include: [
        {
          model: Pharmacy,
            attributes: ["storeName", "profilePic"],
        },
        {
          model: Customer,
            attributes: ["firstName", "lastName", "profilePic"],
        }
      ],
      order: [["createdAt", "DESC"]],
    });
    if (!reviews) {
      createError("reviews not found", 400);
    }
    res.status(200).json({ reviews });
  } catch (error) {
    next(error);
  }
};
