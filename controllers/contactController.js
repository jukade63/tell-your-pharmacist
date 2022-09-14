const { Contact } = require('../models')
const createError = require('../utils/createError')

exports.getCustomerContacts = async (req, res, next) => {
  try {
    const { id } = req.user

    const contacts = await Contact.findAll({ where: { pharmacyId: id } })

    if (!contacts) {
      createError('not found any curtomers', 400)
    }

    res.status(200).json({ contacts })
  } catch (error) {
    next(error)
  }
}

exports.getPharmacyContacts = async (req, res, next) => {
  try {
    const { id } = req.user

    const contacts = await Contact.findAll({ where: { customerId: id } })

    if (!contacts) {
      createError('not found any pharmacies', 400)
    }

    res.status(200).json({ contacts })
  } catch (error) {
    next(error)
  }
}

exports.addContact = async (req, res, next) => {
  try {
    const { pharmacyId } = req.params
    const { id } = req.user
    const contact = await Contact.create({ pharmacyId, customerId: id })

    if (!contact) {
      createError('cannot add contact', 400)
    }

    res.status(201).json({ contact })
  } catch (error) {
    next(error)
  }
}
