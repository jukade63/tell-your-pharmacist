const { OpeningTime, Pharmacy } = require('../models')
const fs = require('fs')
const cloudinary = require('../utils/cloudinary')
const createError = require('../utils/createError')
const haversine = require('haversine-distance')
// const cloudinary = require('cloudinary').v2

exports.getAllpharmacies = async (req, res, next) => {
  try {
    const { lat, lng } = req.params
    const pharmacies = await Pharmacy.findAll()
    if (!pharmacies) {
      createError('Cannot find a pharmacy')
    }
    pharmacies.forEach((p) => {
      const a = { lat, lng }
      const b = { lat: p.latitude, lng: p.longitude }
      p.distance = haversine(a, b)
    })
    pharmacies.sort((a, b) => {
      if (a.distance > b.distance) {
        return 1
      }
      if (a.distance < b.distance) {
        return -1
      }
      return 0
    })
    // pharmacies = pharmacies.toJSON()
    res.status(200).json({ pharmacies })
  } catch (error) {
    next(error)
  }
}

exports.getPharmacy = async (req, res, next) => {
  try {
    const { id } = req.params
    const pharmacy = await Pharmacy.findOne({ where: { id } })
    if (!pharmacy) {
      createError('Pharmacy not found', 400)
    }

    res.status(200).json({ pharmacy })
  } catch (error) {
    next(error)
  }
}

exports.getMe = async (req, res, next) => {
  try {
    const user = await Pharmacy.findOne({ where: { id: req.user.id } })
    if (!user) {
      createError('user not found', 400)
    }

    res.status(200).json({ user })
  } catch (error) {
    next(error)
  }
}

exports.addOpeningTime = async (req, res, next) => {
  try {
    const { dayStart, dayEnd, timeStart, timeEnd } = req.body

    const existingOpeningTime = await OpeningTime.findOne({
      where: { pharmacyId: req.user.id },
    })
    if (existingOpeningTime) {
      createError('Opening time has been added', 400)
    }
    const openingTime = await OpeningTime.create({
      dayStart,
      dayEnd,
      timeStart,
      timeEnd,
      pharmacyId: req.user.id,
    })
    if (!openingTime) {
      createError('opening time not found', 400)
    }
    res.status(201).json({ openingTime })
  } catch (error) {
    next(error)
  }
}

exports.updateOpeningTime = async (req, res, next) => {
  try {
    const { dayStart, dayEnd, timeStart, timeEnd } = req.body
    const openingTime = await OpeningTime.findOne({
      where: { pharmacyId: req.user.id },
    })

    if (!openingTime) {
      createError('opening time not found')
    }

    openingTime.dayStart = dayStart
    openingTime.dayEnd = dayEnd
    openingTime.timeStart = timeStart
    openingTime.timeStart = timeEnd

    openingTime.save()
    res.status(201).json({ openingTime })
  } catch (error) {
    next()
  }
}

exports.updatePharmacy = async (req, res, next) => {
  try {
    const { firstName, lastName, phoneNumber, email, isOpen } = req.body

    if (!firstName || !lastName || !phoneNumber || !email) {
      createError('All fields are required', 400)
    }

    const pharmacy = await Pharmacy.findOne({ where: { id: req.user.id } })

    if (!pharmacy) {
      createError('pharmacy not found', 400)
    }

    pharmacy.firstName = firstName
    pharmacy.lastName = lastName
    pharmacy.phoneNumber = phoneNumber

    pharmacy.save()
    res.status(200).json({ pharmacy })
  } catch (error) {
    next(error)
  }
}

exports.updatePictures = async (req, res, next) => {
  try {
    // console.log(req.file)
    const pharmacy = await Pharmacy.findOne({ where: { id: req.user.id } })

    let updatedProfilePic
    if (req.files.profilePic) {
      const result = await cloudinary.upload(req.files.profilePic[0].path)
      if (pharmacy.profilePic) {
        const splitted = pharmacy.profilePic.split('/')
        const publicId = splitted[splitted.length - 1].split('.')[0]
        await cloudinary.destroy(publicId)
      }
      updatedProfilePic = result.secure_url
    }

    let updatedCoverPhoto
    if (req.files.coverPhoto) {
      const result = await cloudinary.upload(req.files.coverPhoto[0].path)
      if (pharmacy.coverPhoto) {
        const splitted = pharmacy.coverPhoto.split('/')
        const publicId = splitted[splitted.length - 1].split('.')[0]
        await cloudinary.destroy(publicId)
      }
      updatedCoverPhoto = result.secure_url
    }
    pharmacy.profilePic = updatedProfilePic
    pharmacy.coverPhoto = updatedCoverPhoto

    pharmacy.save()

    res.status(200).json('profile picture updated')
  } catch (err) {
    next(err)
  }
}
