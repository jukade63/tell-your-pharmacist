const express = require("express");
const {
  getOpeningTime,
  updateOpeningTime,
  getOpeningTimeByPharmacyId,
} = require("../controllers/pharmacyController");
const {
  userAuthentication,
  pharmacyAuthentication,
} = require("../middlewares/authentication");
const router = express.Router();

router.get("/", userAuthentication, getOpeningTime);
router.get("/:pharmacyId", userAuthentication, getOpeningTimeByPharmacyId);
router.put("/", pharmacyAuthentication, updateOpeningTime);

module.exports = router;
