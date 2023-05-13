const multer = require('multer')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('cloudinary').v2
// const { v4: uuid } = require('uuid')

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
})

exports.upload = multer({ storage: storage })
