const express = require("express");
const {
  getOpeningTime,
  updateOpeningTime,
} = require("../controllers/pharmacyController");
const {
  userAuthentication,
  pharmacyAuthentication,
} = require("../middlewares/authentication");
const router = express.Router();

router.get("/", userAuthentication, getOpeningTime);
router.put("/", pharmacyAuthentication, updateOpeningTime);

module.exports = router;
