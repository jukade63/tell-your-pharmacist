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
} = require("../middlewares/authentication");
const { upload } = require("../middlewares/upload");

const router = express.Router();

router.get("/me", customerAuthentication, getMe);
router.get('/:id', getCustomerById)
router.patch(
  "/upload",
  customerAuthentication,
  upload.fields([{ name: "profilePic", maxCount: 1 }]),
  updateProfilePicture
);
router.put("/healthInfo", customerAuthentication, updateHealthInfo);
router.put("/healthInfo/:id", customerAuthentication, updateHealthInfo);
router.get("/healthInfo/:customerId", pharmacyAuthentication, getHealthInfoById);
router.get("/healthInfo", customerAuthentication, getHealthInfo);
router.post("/address", customerAuthentication, addAddress);
router.put("/address/:id", customerAuthentication, updateAddress);
router.delete("/address/:id", customerAuthentication, deleteAddress);

module.exports = router;
