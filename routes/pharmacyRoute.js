const { upload } = require('../middlewares/upload')
const express = require('express')
const {
  addOpeningTime,
  updateOpeningTime,
  updatePharmacy,
  updatePictures,
  getAllpharmacies,
  getPharmacy,
  getMe,
} = require('../controllers/pharmacyController')
const { pharmacyAuthentication } = require('../middlewares/authentication')
const router = express.Router()

router.patch(
  '/upload',
  // upload.single('profilePic'),
  pharmacyAuthentication,
  upload.fields([
    { name: 'profilePic', maxCount: 1 },
    { name: 'coverPhoto', maxCount: 1 },
  ]),
  updatePictures
)

router.get('/', pharmacyAuthentication, getMe)
router.get('/:lat/:lng', getAllpharmacies)
router.get('/:id', getPharmacy)
router.put('/', pharmacyAuthentication, updatePharmacy)
router.post('/openingTime', pharmacyAuthentication, addOpeningTime)
router.put('/openingTime', pharmacyAuthentication, updateOpeningTime)

module.exports = router
