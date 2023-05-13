const express = require("express");
const {
  getHealthInfo,
  updateHealthInfo,
  addAddress,
  updateAddress,
  deleteAddress,
  getMe,
  updateProfilePicture,
  getHealthInfoById,
  getCustomerById,
} = require("../controllers/customerController");
const {
  customerAuthentication,
  pharmacyAuthentication,
  userAuthentication,
} = require("../middlewares/authentication");
const { upload } = require("../middlewares/upload");

const router = express.Router();

router.get("/", userAuthentication, getMe);
router.get('/customer/:id', userAuthentication, getCustomerById)
router.get("/healthInfo", userAuthentication, getHealthInfo);
router.patch(
  "/upload",
  customerAuthentication,
  upload.fields([{ name: "profilePic", maxCount: 1 }]),
  updateProfilePicture
);
router.get("/healthInfo/:customerId", pharmacyAuthentication, getHealthInfoById);
router.put("/healthInfo", customerAuthentication, updateHealthInfo);
router.put("/healthInfo/:id", customerAuthentication, updateHealthInfo);
router.patch("/address/update", customerAuthentication, updateAddress);

module.exports = router;
