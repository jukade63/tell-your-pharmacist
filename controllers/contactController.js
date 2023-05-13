const { Op } = require("sequelize");
const { Contact, Pharmacy, Customer } = require("../models");
const createError = require("../utils/createError");

exports.getContacts = async (req, res, next) => {
  try {
    const { id } = req.user;

    const contacts = await Contact.findAll({
      where: {
        [Op.or]: [{ pharmacyId: id }, { customerId: id }],
      },
      include: [
        {
          model: Customer,
            attributes: ["id","firstName", "lastName", "profilePic", "address"],
        },
        {
          model: Pharmacy,
            attributes: ["storeName", "profilePic"],
        },
      ],
    });

    if (!contacts) {
      createError("contacts not found", 400);
    }

    res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
};
exports.getOneContact = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { contactId } = req.params;

    const contact = await Contact.findOne({
      where: {
        [Op.or]: [
          { pharmacyId: id, customerId: contactId },
          { customerId: id, pharmacyId: contactId },
        ],
      },
      include: [
        {
          model: Customer,
            attributes: ["firstName", "lastName", "profilePic"],
        },
        {
          model: Pharmacy,
            attributes: ["storeName", "profilePic"],
        },
      ],
    });

    if (!contact) {
      createError("contacts not found", 400);
    }

    res.status(200).json({ contact });
  } catch (error) {
    next(error);
  }
};

exports.addContact = async (req, res, next) => {
  try {
    const { pharmacyId } = req.params;
    const { id } = req.user;
    const [contact, created] = await Contact.findOrCreate({
      where: { pharmacyId, customerId: id },
    });
    if (!created) {
      return;
    }
    if (!contact) {
      createError("cannot add contact", 400);
    }

    res.status(201).json({ contact });
  } catch (error) {
    next(error);
  }
};
