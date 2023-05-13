const express = require('express')
const { addReview, getReviews, getExistingReview } = require('../controllers/reviewController')
const { customerAuthentication, userAuthentication } = require('../middlewares/authentication')
const router = express.Router()

router.post('/', customerAuthentication, addReview)
router.get('/:pharmacyId', userAuthentication, getReviews)

module.exports = router

