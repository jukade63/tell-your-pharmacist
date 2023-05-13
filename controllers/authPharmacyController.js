const { Pharmacy, OpeningTime } = require('../models')
const createError = require('../utils/createError')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const validator = require('validator')

exports.login = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body
    const pharmacy = await Pharmacy.findOne({ where: { phoneNumber } })

    if (!pharmacy) {
      createError('ชื่อหรือรหัสผ่านไม่ถูกต้อง', 400)
    }

    const isMatch = await bcrypt.compare(password, pharmacy.password)

    if (!isMatch) {
      createError('ชื่อหรือรหัสผ่านไม่ถูกต้อง', 400)
    }

    const token = jwt.sign({ id: pharmacy.id }, 'secret_key', {
      expiresIn: '30d',
    })
    res.json({ token })
  } catch (error) {
    next(error)
  }
}

exports.signup = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
      storeName,
      latitude,
      longitude,
    } = req.body

    const existingPharmacy = await Pharmacy.findOne({ where: { phoneNumber } })

    if (existingPharmacy) {
      createError('User already registered', 400)
    }

    if (!phoneNumber) {
      createError('Phone number is required', 400)
    }

    if (!password) {
      createError('Password is required', 400)
    }
    if (password !== confirmPassword) {
      createError('Password and confirm password did not match', 400)
    }

    const isMobilePhone = validator.isMobilePhone(phoneNumber + '')
    const isEmail = validator.isEmail(email + '')
    if (!isMobilePhone && !isEmail) {
      createError('Email or phone number is invalid format', 400)
    }

    const hashedPassword = await bcrypt.hash(password, 12)
    const pharmacy = await Pharmacy.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
      storeName,
      latitude,
      longitude,
    })

    if(pharmacy){
      try {
        await OpeningTime.create({pharmacyId: pharmacy.id})
      } catch (error) {
        next(error)
      }

    }

    const token = jwt.sign({ id: Pharmacy.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(201).json({ token })
  } catch (error) {
    next(error)
  }
}
