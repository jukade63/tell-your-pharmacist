const { Chat } = require('../models')
const createError = require('../utils/createError')

exports.addMessage = async (req, res, next) => {
  try {
    const { message, contactId } = req.body

    const chat = await Chat.create({ contactId, message })
    if (!chat) {
      createError('failed to add message')
    }
    res.status(201).json({ chat })
  } catch (error) {
    next(error)
  }
}

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await Chat.findAll({
      where: { contactId: req.params.contactId },
    })
    if (!messages) {
      createError('messages not found')
    }

    res.status(200).json({ messages })
  } catch (error) {
    next(error)
  }
}
