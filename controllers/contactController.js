const { Op } = require("sequelize");
const { Contact, Pharmacy, Customer } = require("../models");
const createError = require("../utils/createError");


exports.getContacts = async (req, res, next) => {
  try {
    const { id } = req.user;

    const contacts = await Contact.findAll({
      where: {
        [Op.or]: [{ pharmacyId: id },{customerId: id}]
      },
      include: [{ model: Customer }, {model: Pharmacy}],
    });

    if (!contacts) {
      createError("contacts not found", 400);
    }

    res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
};

exports.getCustomerContacts = async (req, res, next) => {
  try {
    const { id } = req.user;


    const contacts = await Contact.findAll({
      where: { pharmacyId: id },
      include: [{ model: Customer }],
    });

    if (!contacts) {
      createError("not found any curtomers", 400);
    }

    res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
};

exports.getPharmacyContacts = async (req, res, next) => {

  try {
    const { id } = req.user;

    const contacts = await Contact.findAll({ where: { customerId: id }, include: [{ model: Pharmacy }], });

    if (!contacts) {
      createError("not found any pharmacies", 400);
    }

    res.status(200).json({ contacts });
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
