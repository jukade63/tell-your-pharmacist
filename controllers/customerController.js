const { HealthInfo, Address, Customer } = require('../models')
const createError = require('../utils/createError')


exports.getMe = async (req, res, next) => {
  try {
    const user = await Customer.findOne({ where: { id: req.user.id } })
    if (!user) {
      createError('user not found', 400)
    }

    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}

exports.createHealthInfo = async (req, res, next) => {
  try {
    const { age, weight, height, allergy, diseases, medication } = req.body
    const healthInfo = await HealthInfo.create({
      age,
      weight,
      height,
      allergy,
      diseases,
      medication,
      customerId: req.customer.id,
    })

    if (!healthInfo) {
      createError('failed adding health info', 400)
    }

    res.status(201).json({ healthInfo })
  } catch (error) {
    next(error)
  }
}

exports.getHealthInfo = async (req, res, next) => {
  try {
    const { id } = req.params
    const healthInfo = await HealthInfo.findOne({ where: { customerId: id } })

    if (!healthInfo) {
      createError('failed adding helth info', 400)
    }

    res.status(201).json({ healthInfo })
  } catch (error) {
    next(error)
  }
}

exports.updateHealthInfo = async (req, res, next) => {
  try {
    const { age, weight, height, allergy, diseases, medication } = req.body
    const healthInfo = await HealthInfo.findOne({
      where: { customerId: req.user.id },
    })

    healthInfo.age = age
    healthInfo.weight = weight
    healthInfo.height = height
    healthInfo.allergy = allergy
    healthInfo.diseases = diseases
    healthInfo.medication = medication

    healthInfo.save()

    res.status(200).json({ healthInfo })
  } catch (error) {
    next(error)
  }
}

exports.addAddress = async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body
    const address = await Address.create({
      latitude,
      longitude,
      customerId: req.user.id,
    })
    if (!address) {
      createError('faild to add the address', 400)
    }

    req.status(201).json({ address })
  } catch (error) {
    next(error)
  }
}

exports.getAddresses = async (req, res, next) => {
  try {
    const address = await Address.findOne({
      where: { customerId: req.user.id },
    })
    if (!address) {
      createError('faild to get the address', 400)
    }

    req.status(201).json({ address })
  } catch (error) {
    next(error)
  }
}

exports.updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params
    const { latitude, longitude } = req.body
    const address = await Address.findOne({
      where: { id, customerId: req.user.id },
    })

    if (!address) {
      createError('faild to get the address', 400)
    }
    address.latitude = latitude
    address.longitude = longitude

    address.save()
    req.status(201).json({ address })
  } catch (error) {
    next(error)
  }
}

exports.deleteAddress = async (req, res, next) => {
  try {
    const { id } = req.params
    const address = await Address.findOne({
      where: { id, customerId: req.user.id },
    })

    if (!address) {
      createError('faild to get the address', 400)
    }

    address.destroy()
    req.status(204).json()
  } catch (error) {
    next(error)
  }
}
